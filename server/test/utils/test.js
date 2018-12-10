const { expect, assert } = require("chai");

const { formatBlock, validateBlock, handleError } = require("../utils");
const {} = require("../controllers");
const { dummyBlocks } = require("./dummyBlocks");
const dummyRawBlock = require("./dummyRawBlock");

describe("formatBlock", () => {
  const goodBlock = {
    block_num: 30606849,
    id: "01d306017de8a8e63fc2db4810b2267b3132ea88bf70c00accc1d954566ef0ef",
    timestamp: "2018-12-06T03:06:07.500",
    actionCount: 42
  };
  const formatted = formatBlock(dummyRawBlock);

  it("should format a block to be displayed on the client", () => {
    expect(formatted).to.eql(goodBlock);
  });

  it("should have all required properties", () => {
    expect(formatted).to.have.property("block_num");
    expect(formatted).to.have.property("id");
    expect(formatted).to.have.property("timestamp");
    expect(formatted).to.have.property("actionCount");
  });

  it("should count the number of actions", () => {
    const rawBlockFiveActions = formatBlock(require("./rawBlockFiveActions"));
    expect(rawBlockFiveActions.actionCount).to.equal(5);
  });

  it("should not have extra properties", () => {
    const propertyCount = Object.keys(formatted).length;
    expect(propertyCount).to.equal(4);
  });
});

describe("validateBlock", () => {
  const goodBlock = require("./dummyRawBlock");
  const badBlock = require("./dummyRawBlockNoTransactions");

  it("should invalidate a bad block", () => {
    const invalid = validateBlock(badBlock);
    expect(invalid).to.equal(false);
  });

  it("should validate a good block", () => {
    const validated = validateBlock(goodBlock);
    expect(validated).to.equal(true);
  });

  it("should invalidate undefined or null blocks", () => {
    expect(validateBlock(undefined)).to.equal(false);
    expect(validateBlock(null)).to.equal(false);
  });

  it("should validate all required properties", () => {
    expect(goodBlock).to.have.property("block_num");
    expect(goodBlock).to.have.property("id");
    expect(goodBlock).to.have.property("timestamp");
    expect(goodBlock).to.have.property("transactions");
  });
});
