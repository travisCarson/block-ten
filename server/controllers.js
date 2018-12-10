/* eslint-disable camelcase */
const { JsonRpc } = require("eosjs");
const fetch = require("node-fetch");
const { formatBlock, validateBlock, handleError } = require("./utils");
const { rpcConfig } = require("./config");
const { rpcUrl, rpcPort, maxRetryAttempts } = rpcConfig;

const rpc = new JsonRpc(`${rpcUrl}:${rpcPort}`, { fetch });

async function getHeadBlockNum(maxAttemps = 3, attempts = 1) {
  let info;
  try {
    info = await rpc.get_info();
  } catch (error) {
    handleError(error, "Error receiving head block num:");
  }
  return info.head_block_num;
}

async function getBlock(block_num, maxAttempts = maxRetryAttempts, prevError) {
  let rawBlock;
  try {
    rawBlock = await rpc.get_block(block_num);
  } catch (error) {
    handleError(error, `Error retrieving block number ${block_num}`);
    return;
  }
  if (!validateBlock(rawBlock)) {
    const error = {
      message: `RPC returned an invalid block`
    };
    return handleError(error, error.message);
  }
  return rawBlock;
}

async function getAndFormatBlock(block_num) {
  return formatBlock(await getBlock(block_num));
}

async function getTenMostRecentBlocks() {
  const headBlock = await getAndFormatBlock(await getHeadBlockNum());
  const blocks = [headBlock];
  for (let i = 1; i < 10; i++) {
    blocks.push(await getAndFormatBlock(headBlock.block_num - i));
  }
  return blocks;
}

async function sendRawBlock(req, res) {
  res.send(await getBlock(req.body.id));
}

async function sendTenBlocks(req, res) {
  res.send(await getTenMostRecentBlocks());
}

module.exports = {
  sendRawBlock,
  sendTenBlocks
};
