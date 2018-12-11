/* eslint-disable camelcase */
const { JsonRpc } = require("eosjs");
const fetch = require("node-fetch");
const { formatBlock, validateBlock, hasBlock } = require("./utils");
const {
  blockSource,
  localNodeUrl,
  localNodePort,
  remoteNodeList
} = require("./config").rpcConfig;

const endpoint =
  blockSource === "remote"
    ? Object.values(remoteNodeList[0])[0]
    : `${localNodeUrl}:${localNodePort}`;

const initialRpc = new JsonRpc(endpoint, { fetch });

const getNextEndpoint = function getNextEndpoint(index) {
  console.log("INDEX", index);
  if (!remoteNodeList[index]) {
    return null;
  }
  return Object.values(remoteNodeList[index])[0];
};

const getHeadBlockNum = async function getHeadBlockNum(
  rpc = initialRpc,
  failureCount = 0
) {
  console.log("getting head block at ", rpc.endpoint);
  let info;
  try {
    info = await rpc.get_info();
  } catch (error) {
    return handleErrorGetHeadBlockNum(error, failureCount + 1);
  }
  if (info) {
    return info.head_block_num;
  }
};

const handleErrorGetHeadBlockNum = async function handleErrorGetHeadBlockNum(
  error,
  failureCount
) {
  console.log("Error count: ", failureCount);
  console.log(error);
  const nextEndpoint = getNextEndpoint(failureCount);
  let rpc;
  if (nextEndpoint) {
    rpc = new JsonRpc(nextEndpoint, { fetch });
    return getHeadBlockNum(rpc, failureCount);
  }
  console.log("Reached end of endpoint list");
};

const handleGetBlockError = async function handleGetBlockError(
  error,
  failureCount,
  block_num
) {
  console.log(`Error count: ${failureCount}\n`, error);
  const nextEndpoint = getNextEndpoint(failureCount);
  let rpc;
  if (nextEndpoint) {
    rpc = new JsonRpc(nextEndpoint, { fetch });
    const rawBlock = await getBlock(block_num, rpc, failureCount);
    if (!validateBlock(rawBlock)) {
      console.log(`Received invalid block ${block_num}\n${rawBlock}`);
    }

    return rawBlock;
  }
};

const getBlock = async function(block_num, rpc = initialRpc, failureCount = 0) {
  console.log("getting block", block_num, rpc.endpoint);
  let rawBlock;
  try {
    rawBlock = await rpc.get_block(block_num);
    return rawBlock;
  } catch (error) {
    return handleGetBlockError(error, failureCount + 1, block_num);
  }
};

const getAndFormatBlock = async function getAndFormatBlock(block_num) {
  const block = await getBlock(block_num);
  return formatBlock(block);
};

const getTenMostRecentBlocks = async function getTenMostRecentBlocks() {
  const headBlock = await getAndFormatBlock(await getHeadBlockNum());
  const blocks = [headBlock];
  for (let i = 1; i < 10; i++) {
    blocks.push(await getAndFormatBlock(headBlock.block_num - i));
  }
  return blocks;
};
const localBlocks = [];

const perpetuateBlocks = async function perpetuateBlocks() {
  const headBlockNum = await getHeadBlockNum();
  if (!headBlockNum) {
    return;
  }
  let nextBlockNum = headBlockNum;
  const intervalId = setInterval(async () => {
    const newBlock = await getAndFormatBlock(nextBlockNum);
    if (newBlock && !hasBlock(localBlocks, "block_num", newBlock.block_num)) {
      if (localBlocks.length < 10) {
        localBlocks.push(newBlock);
        console.log(newBlock.block_num);
      } else {
        localBlocks.shift();
        localBlocks.push(newBlock);
      }
      nextBlockNum += 1;
    }
  }, 440);
  return intervalId;
};

const sendRawBlock = async function sendRawBlock(req, res) {
  res.send(await getBlock(req.body.id));
};

const sendTenBlocks = async function sendTenBlocks(req, res) {
  console.log("SENDING TEN");
  res.send(localBlocks);
};

module.exports = {
  sendRawBlock,
  sendTenBlocks,
  getHeadBlockNum,
  getBlock,
  getAndFormatBlock,
  getTenMostRecentBlocks,
  perpetuateBlocks
};
