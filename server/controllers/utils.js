/* eslint-disable camelcase */
const { JsonRpc } = require("eosjs");
const fetch = require("node-fetch");

const prepareEndpointList = function(
  originalList,
  blockSource,
  maxRequests,
  localNodeUrl,
  localNodePort
) {
  let endpointList = originalList.slice();
  if (blockSource === "local") {
    endpointList = new Array(maxRequests).fill({
      localhost: `${localNodeUrl}:${localNodePort}`
    });
    return endpointList;
  }
  const paddedList = padEndpointList(endpointList, maxRequests);
  return paddedList;
};

const padEndpointList = function(
  endpointList,
  maxRequests,
  paddingSize = maxRequests - endpointList.length
) {
  if (paddingSize > 0) {
    const padding = endpointList.slice(0, paddingSize);
    paddingSize -= padding.length;
    endpointList = endpointList.concat(padding);
    return padEndpointList(endpointList, maxRequests, paddingSize);
  }
  if (paddingSize < 0) {
    const lastIndex = endpointList.length + paddingSize;
    endpointList = endpointList.slice(0, lastIndex);
  }
  return endpointList;
};

const getNextEndpoint = function(endpointList, index) {
  if (!endpointList || !endpointList[index]) {
    return null;
  }
  return Object.values(endpointList[index])[0];
};

const formatBlock = function(rawBlock) {
  if (!rawBlock) {
    return;
  }
  const { id, timestamp, transactions, block_num } = rawBlock;

  const actionCount = transactions.reduce((acc, transaction) => {
    if (
      transaction &&
      transaction.trx &&
      transaction.trx.transaction &&
      transaction.trx.transaction.actions
    ) {
      return acc + transaction.trx.transaction.actions.length;
    }
    return 0;
  }, 0);
  return { block_num, id, timestamp, actionCount };
};

const validateBlock = function validateBlock(block) {
  if (
    block &&
    block.block_num &&
    block.timestamp &&
    block.id &&
    block.transactions
  ) {
    return true;
  }
  return false;
};

const validateGetInfo = function(info) {
  return !info || !info.head_block_num || typeof headBlockNum !== "number";
};

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
  console.log("nextRpc", nextRpc.endpoint);
  if (callbackArgs.length) {
    newResult = callback(...callbackArgs, nextRpc, failureCount);
    return newResult;
  }
  newResult = callback(nextRpc, failureCount);
  return newResult;
};

module.exports = {
  formatBlock,
  validateBlock,
  validateGetInfo,
  handleError,
  prepareEndpointList,
  getNextEndpoint
};
