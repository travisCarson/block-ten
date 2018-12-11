/* eslint-disable camelcase */
const { JsonRpc } = require("eosjs");
const fetch = require("node-fetch");
<<<<<<< Updated upstream:server/localControllers.js
const { formatBlock, validateBlock, handleError } = require("./utils");
const { rpcConfig } = require("./config");
const { localNodeUrl, localNodePort } = rpcConfig;

const rpc = new JsonRpc(`${localNodeUrl}:${localNodePort}`, { fetch });

async function getHeadBlockNum() {
=======
const { formatBlock, validateBlock } = require("./utils");
const {
  blockSource,
  localNodeUrl,
  localNodePort,
  remoteNodeList
} = require("./config").rpcConfig;

// if (blockSource === 'remote') {
//   buildEndpointList();
// }

const endpoint =
  blockSource === "remote"
    ? Object.values(remoteNodeList[0])[0]
    : `${localNodeUrl}:${localNodePort}`;
const initialRpc = new JsonRpc(endpoint, { fetch });

// extract url from dynamic block producer
const getNextEndpoint = function getNextEndpoint(index) {
  console.log("INDEX", index);
  if (!remoteNodeList[index]) {
    return null;
  }
  return Object.values(remoteNodeList[index])[0];
};

// remote
const getHeadBlockNum = async function getHeadBlockNum(
  rpc = initialRpc,
  failureCount = 0
) {
  console.log("getting head block at ", rpc.endpoint);
>>>>>>> Stashed changes:server/controllers.js
  let info;
  try {
    info = await rpc.get_info();
  } catch (error) {
    return handleErrorGet(error, getHeadBlockNum, failureCount + 1);
  }
  console.log("SUCCESS?");
  if (info) {
    return info.head_block_num;
  }
};

const handleErrorGet = async function handleErrorGet(error, failureCount) {
  console.log("Error count: ", failureCount);
  console.log(error);
  const nextEndpoint = getNextEndpoint(failureCount);
  console.log("NEXT", nextEndpoint);
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
  console.log(`Error count: ${failureCount}\n ${error}`);
  const nextEndpoint = getNextEndpoint(failureCount);
  let rpc;
  if (nextEndpoint) {
    rpc = new JsonRpc(nextEndpoint, { fetch });
    const rawBlock = await getBlock(block_num, rpc, failureCount);
    if (!validateBlock(rawBlock)) {
      console.log(`Received invalid block ${block_num}`);
      return;
    }

    return rawBlock;
  }
};

<<<<<<< Updated upstream:server/localControllers.js
async function getBlock(block_num) {
=======
const getBlock = async function(block_num, rpc = initialRpc, failureCount = 0) {
  console.log("getting block", block_num, rpc.endpoint);
>>>>>>> Stashed changes:server/controllers.js
  let rawBlock;
  try {
    rawBlock = await rpc.get_block(block_num);
    return rawBlock;
  } catch (error) {
    return handleGetBlockError(error, failureCount + 1, block_num);
  }
};

const getAndFormatBlock = async function getAndFormatBlock(block_num) {
  return formatBlock(await getBlock(block_num));
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

const perpetuateLocalBlocks = async function perpetuateLocalBlocks() {
  const headBlockNum = await getHeadBlockNum();
  if (!headBlockNum) {
    return;
  }
  let nextBlockNum = headBlockNum;
  const intervalId = setInterval(async () => {
    const newBlock = await getAndFormatBlock(nextBlockNum);
    console.log(newBlock.blockNum);
    if (newBlock && !hasBlock(localBlocks, "blockNum", newBlock.blockNum)) {
      if (localBlocks.length < 10) {
        localBlocks.push(newBlock);
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
  res.send(localBlocks);
};

module.exports = {
  sendRawBlock,
  sendTenBlocks,
  getHeadBlockNum,
  getBlock,
  getAndFormatBlock,
  getTenMostRecentBlocks
};

// not sure what's up with this one. Nothing happens
