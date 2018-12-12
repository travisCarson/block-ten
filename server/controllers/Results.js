class Results {
  constructor() {
    this.smallBlocks = [];
    this.rawBlocks = new Map();
  }

  // can make this chop smallblocks before concatenating
  handleNewBlocks(newBlocks) {
    let { smallBlocks } = this;
    this.smallBlocks = this.smallBlocks.concat(newBlocks);
    if (this.smallBlocks.length > 10) {
      const numToRemove = this.smallBlocks.length - 10;
      this.smallBlocks = this.smallBlocks.slice(numToRemove);
    }
    console.log(
      "\x1b[41m\x1b",
      "smallBlocks",
      this.smallBlocks,
      "\x1b[0m",
      this.smallBlocks.length
    );
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
