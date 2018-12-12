class Results {
  constructor() {
    this.smallBlocks = [];
  }

  // can make this chop smallblocks before concatenating
  handleNewBlocks(newBlocks) {
    let { smallBlocks } = this;
    this.smallBlocks = this.smallBlocks.concat(newBlocks);
    if (this.smallBlocks.length > 10) {
      const numToRemove = this.smallBlocks.length - 10;
      this.smallBlocks = this.smallBlocks.slice(numToRemove);
    }
    return smallBlocks;
  }

  countSmallBlocks() {
    return this.smallBlocks.length;
  }

  countRawBlocks() {
    return this.rawBlocks.size();
  }
}

module.exports = Results;
