/* eslint-disable camelcase */
class BlockQueue {
  constructor(delay = 500) {
    this.toGet = [];
    this.lastNumEnqueued = null;
  }

  async enqueueOne(block_num) {
    this.toGet.push(block_num);
    this.lastNumEnqueued = block_num;
  }

  batchDequeue(size) {
    this.toGet = this.toGet.slice(size);
  }
}

module.exports = BlockQueue;
