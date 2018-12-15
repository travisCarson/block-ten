/* eslint-disable camelcase */
const { getHeadBlockNum, getBlock, getFormattedBlock } = require("./helpers");
const BlockQueue = require("./BlockQueue");
const Results = require("./Results");
const { blocksToDisplay, resyncMargin } = require("../config");
const CronJob = require("cron").CronJob;

class QueueAndResultsController {
  constructor(results) {
    this.queue = new BlockQueue();
    this.results = new Results(blocksToDisplay);
    this.requesting = false;
    this.cronJobs = [];
  }

  async requestAll() {
    if (this.requesting) {
      return;
    }
    this.requesting = true;
    const { results, queue } = this;
    while (queue.size()) {
      let newBlocks = queue.dequeueAll().map(async block_num => {
        return getFormattedBlock(block_num);
      });
      newBlocks = await Promise.all(newBlocks);
      results.handleNewBlocks(newBlocks);
    }
    this.requesting = false;
  }

  async enqueuePerpetually(firstBlockNum) {
    const { queue } = this;
    let nextNum = firstBlockNum;
    const cronJobEnqueuePerpetually = new CronJob("* * * * * *", () => {
      queue.batchEnqueue(nextNum - 1, nextNum);
      nextNum = nextNum + 2;
      this.requestAll();
    });
    this.cronJobs.push(cronJobEnqueuePerpetually);
    cronJobEnqueuePerpetually.start();
  }

  async sync() {
    const { results, queue } = this;
    const headBlockNum = await getHeadBlockNum();
    const lastResultNum = results.peekAtMostRecentBlockNum();
    let lastNumEnqueued = queue.peekAtLastEnqueued();

    const queueDifference = !lastNumEnqueued
      ? 0
      : Math.abs(headBlockNum - lastNumEnqueued);

    const resultsDifference = !lastResultNum
      ? 0
      : Math.abs(headBlockNum - lastResultNum);

    const maxDifference = Math.max(queueDifference, resultsDifference);

    // only used if this instance is decorated with test utils
    if (this.analyzePerformance) {
      this.analyzePerformance(
        maxDifference,
        headBlockNum,
        lastResultNum,
        lastNumEnqueued,
        queueDifference,
        resultsDifference
      );
    }

    if (maxDifference > resyncMargin) {
      console.log(
        `\n
        \nOUT OF SYNC. Difference: ${maxDifference}
        \nHead Block ${headBlockNum}
        \nNewest Result ${lastResultNum}
        \nNewest Enqueued ${lastNumEnqueued}
        \nBlock numbers enqueued ${queue.toGet.length}
        \nDifference: ${maxDifference}`
      );
      this.stopCronJobs();
      queue.flush();
      results.flush();
      this.resetPerformanceStats();
      this.start(headBlockNum);
    }
  }

  stopCronJobs() {
    this.cronJobs.forEach(job => job.stop());
    this.cronJobs = [];
  }

  maintainSync() {
    const cronJobMaintainSync = new CronJob("*/4 * * * * *", () => {
      this.sync();
    });
    this.cronJobs.push(cronJobMaintainSync);
    cronJobMaintainSync.start();
  }

  async start(headBlockNum) {
    headBlockNum = headBlockNum || (await getHeadBlockNum());
    this.enqueuePerpetually(headBlockNum);
    this.maintainSync();
  }

  getResults() {
    return this.results.getResults();
  }
}

const queueAndResultsController = new QueueAndResultsController();
queueAndResultsController.start();

const getBlockListRouteHandler = async function(req, res) {
  res.send(queueAndResultsController.getResults());
};

const getRawBlockRouteHandler = async function(req, res) {
  res.send(await getBlock(req.body.id));
};

module.exports = { getBlockListRouteHandler, getRawBlockRouteHandler };
