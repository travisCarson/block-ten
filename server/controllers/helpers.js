/* eslint-disable camelcase */
const fetch = require("node-fetch");
const { JsonRpc } = require("eosjs");

const {
  prepareEndpointList,
  formatBlock,
  validateBlock,
  validateGetInfo,
  getNextEndpoint
} = require("./utils");

const {
  rpcConfig: {
    blockSource,
    localNodeUrl,
    localNodePort,
    remoteNodeList,
    maxRequests
  }
} = require("../config");

const endpointList = prepareEndpointList(
  remoteNodeList,
  blockSource,
  maxRequests,
  localNodeUrl,
  localNodePort
);

const endpoint = getNextEndpoint(endpointList, 0);

const initialRpc = new JsonRpc(endpoint, { fetch });

const handleError = async function({
  error,
  callback,
  callbackArgs,
  failureCount = 1,
  endpointList
}) {
  let newResult;
  console.log(`Error count: ${failureCount}\n ${error}`);
  const nextEndpoint = getNextEndpoint(endpointList, failureCount);
  if (!nextEndpoint) {
    console.log("Maximum attempts made - Request Failed");
    return;
  }
  const nextRpc = new JsonRpc(nextEndpoint, { fetch });
  console.log("nextRpc endpoint", nextRpc.endpoint);
  if (callbackArgs.length) {
    newResult = callback(...callbackArgs, nextRpc, failureCount);
    return newResult;
  }
  newResult = callback(nextRpc, failureCount);
  return newResult;
};

const getHeadBlockNum = async function(rpc = initialRpc, failureCount = 0) {
  let info;
  let headBlockNum;
  try {
    info = await rpc.get_info();
    if (!validateGetInfo(headBlockNum)) {
      throw new Error("Received invalid head block number");
    }
  } catch (error) {
    return handleError({
      error,
      callback: getHeadBlockNum,
      callbackArgs: [],
      failureCount: failureCount + 1,
      endpointList
    });
  }
  return info.head_block_num;
};

const getBlock = async function(block_num, rpc = initialRpc, failureCount = 0) {
  let rawBlock;
  let blockIsValid;
  try {
    rawBlock = await rpc.get_block(block_num);
    blockIsValid = validateBlock(rawBlock);
    if (!blockIsValid) {
      throw new Error(`Invalid block received: ${block_num}`);
    }
  } catch (error) {
    try {
      rawBlock = handleError({
        error,
        callback: getBlock,
        callbackArgs: [block_num],
        failureCount: failureCount + 1,
        endpointList
      });
    } catch (error) {
      console.log(error);
    }
  }
  return rawBlock;
};

const getFormattedBlock = async function(block_num) {
  return formatBlock(await getBlock(block_num));
};

module.exports = {
  getHeadBlockNum,
  getBlock,
  getFormattedBlock
};
