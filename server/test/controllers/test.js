// const { expect } = require("chai");
// const fetch = require("node-fetch");
// const { JsonRpc } = require("eosjs");
// const {
//   getHeadBlockNum,
//   getBlock,
//   getAndFormatBlock,
//   getTenMostRecentBlocks
// } = require("../../controllers");
// const { rpcConfig } = require("../../config");
// const { validateBlock } = require("../../utils");
//
// const { rpcUrl, rpcPort } = rpcConfig;
//
// const rpc = new JsonRpc(`${rpcUrl}:${rpcPort}`, { fetch });
//
// const checkIfObjectLiteral = value =>
//   typeof value === "object" && value !== null && !Array.isArray(value);
//
// describe("JsonRPC", () => {
//   describe("Get info", () => {
//     let info;
//     before(async () => (info = await rpc.get_info()));
//     it("should return an object literal", () => {
//       expect(checkIfObjectLiteral(info)).to.equal(true);
//     });
//     it("should contain the head block number", () => {
//       expect(typeof info.head_block_num).to.equal("number");
//     });
//   });
//   describe("Get block", () => {
//     let block;
//     before(async () => {
//       block = await getBlock(12345);
//     });
//     it("should return an object literal", () => {
//       expect(checkIfObjectLiteral(block)).to.equal(true);
//     });
//     it("should have the required properties", () => {
//       expect(block).to.have.property("block_num");
//       expect(block).to.have.property("id");
//       expect(block).to.have.property("timestamp");
//       expect(block).to.have.property("transactions");
//     });
//   });
// });
//
// describe("Controllers", () => {
//   describe("Getting head block number", () => {
//     it("2 should get the block number of the head block", async () => {
//       const blockNumber = await getHeadBlockNum();
//       expect(typeof blockNumber).to.equal("number");
//     });
//   });
//
//   describe("Getting a block", () => {
//     let block;
//     before(async () => {
//       block = await getBlock(12345);
//     });
//     it("should get a block", async () => {
//       expect(typeof block).to.equal("object");
//     });
//     it("should get the correct block", async () => {
//       const block = await getBlock(12345);
//       expect(block.block_num).to.equal(12345);
//     });
//   });
//
//   describe("Getting ten blocks", () => {
//     let blocks;
//     before(async () => {
//       blocks = await getTenMostRecentBlocks();
//     });
//     it("should return an array of object literals", () => {
//       expect(blocks.every(checkIfObjectLiteral)).to.equal(true);
//     });
//     it("should have 10 items", () => {
//       expect(blocks.length).to.equal(10);
//     });
//   });
// });
//
// describe("Integration", () => {
//   describe("Formatting", () => {
//     let formatted;
//     before(async () => {
//       formatted = await getAndFormatBlock(1);
//     });
//
//     it("should have all required properties", () => {
//       expect(formatted).to.have.property("block_num");
//       expect(formatted).to.have.property("id");
//       expect(formatted).to.have.property("timestamp");
//       expect(formatted).to.have.property("actionCount");
//     });
//
//     it("should count the number of actions", () => {
//       expect(formatted.actionCount).to.equal(0);
//     });
//
//     it("should not have extra properties", () => {
//       const propertyCount = Object.keys(formatted).length;
//       expect(propertyCount).to.equal(4);
//     });
//   });
//   describe("Raw block validation", () => {
//     let rawBlock;
//     let invalidBlock;
//     before(async () => {
//       rawBlock = await getBlock(1);
//       invalidBlock = Object.assign({}, rawBlock);
//       delete invalidBlock.transactions;
//     });
//     it("should invalidate a bad block", () => {
//       const invalidated = validateBlock(invalidBlock);
//       expect(invalidated).to.equal(false);
//     });
//
//     it("should validate a good block", () => {
//       const validated = validateBlock(rawBlock);
//       expect(validated).to.equal(true);
//     });
//
//     it("should validate all required properties", () => {
//       expect(rawBlock).to.have.property("block_num");
//       expect(rawBlock).to.have.property("id");
//       expect(rawBlock).to.have.property("timestamp");
//       expect(rawBlock).to.have.property("transactions");
//     });
//   });
// });
