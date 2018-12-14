class Results {
  constructor(blocksToDisplay) {
    this.resultsSize = blocksToDisplay;
    this.smallBlocks = [];
  }

  // can make this chop smallblocks before concatenating
  handleNewBlocks(newBlocks) {
    const newBlocksReversed = newBlocks.reverse();
    const numToRemove =
      newBlocksReversed.length + this.smallBlocks.length - this.resultsSize;
    for (let i = 1; i <= numToRemove; i++) {
      this.smallBlocks.pop();
    }
    this.smallBlocks = newBlocksReversed.concat(this.smallBlocks);
  }

  countSmallBlocks() {
    return this.smallBlocks.length;
  }

  peekAtMostRecentBlockNum() {
    if (this.smallBlocks.length) {
      return this.smallBlocks[0];
    }
    return null;
  }

  flush() {
    this.smallBlocks = [];
  }

  getResults() {
    return this.smallBlocks;
  }
}

module.exports = Results;
