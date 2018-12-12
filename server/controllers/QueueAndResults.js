/* eslint-disable camelcase */
const { getHeadBlockNum, getBlock, getFormattedBlock } = require("./helpers");
const BlockQueue = require("./BlockQueue");
const Results = require("./Results");

class QueueAndResultsController {
  constructor(results) {
    this.queue = new BlockQueue();
    this.results = new Results();
    this.running = false;
  }

  async requestAll() {
    if (this.running) {
      return;
    }
    this.running = true;
    const { results } = this;
    while (this.queue.toGet.length) {
      console.log("toGet", this.queue.toGet, this.queue.toGet.length);
      let newBlocks = this.queue.toGet.map(async block_num => {
        return getFormattedBlock(block_num);
      });
      newBlocks = await Promise.all(newBlocks);
      newBlocks = newBlocks.map(block => block.block_num); // delete this
      console.log("GOT", newBlocks);
      results.handleNewBlocks(newBlocks);
      this.queue.batchDequeue(newBlocks.length);
    }
    this.running = false;
  }

  async enqueuePerpetually(firstBlockNum) {
    const { queue } = this;
    const intervalID = setInterval(() => {
      let nextNum = firstBlockNum;
      nextNum = queue.lastNumEnqueued + 1;
      queue.enqueueOne(nextNum);
      this.requestAll();
    }, 500);
    return intervalID;
  }

  async start() {
    const headBlockNum = await getHeadBlockNum();
    this.enqueuePerpetually(headBlockNum);
    this.requestAll();
  }

  getTen() {
    return this.results.smallBlocks;
  }
}

const queueAndResultsController = new QueueAndResultsController();
queueAndResultsController.start();

const getBlockListRouteHandler = async function(req, res) {
  res.send(queueAndResultsController.getTen());
};

const getRawBlockRouteHandler = async function(req, res) {
  res.send(await getBlock(req.body.id));
};

module.exports = { getBlockListRouteHandler, getRawBlockRouteHandler };
