/* eslint-disable camelcase */
class BlockQueue {
  constructor(delay = 500) {
    this.toGet = [];
    this.lastNumEnqueued = null;
  }

  batchEnqueue(lowest, highest) {
    let newNumbers = [];
    for (let i = lowest; i <= highest; i++) {
      newNumbers.push(i);
      if (i === highest) {
        this.lastNumEnqueued = i;
      }
    }
    this.toGet = this.toGet.concat(newNumbers);
  }

  dequeueAll() {
    const results = this.toGet.slice();
    this.toGet = [];
    return results;
  }

  peekAtLastEnqueued() {
    return this.lastNumEnqueued;
  }

  flush() {
    this.toGet = [];
    this.lastNumEnqueued = null;
  }

  size() {
    return this.toGet.length;
  }
}

module.exports = BlockQueue;
