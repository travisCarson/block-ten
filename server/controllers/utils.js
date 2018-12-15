/* eslint-disable camelcase */

const prepareEndpointList = function(
  originalList,
  blockSource,
  maxRequests,
  localNodeUrl,
  localNodePort
) {
  console.log('PREPARING')
  let endpointList = originalList.slice();
  if (blockSource === "local") {
    endpointList = new Array(maxRequests).fill({
      localhost: `${localNodeUrl}:${localNodePort}`
    });
    return endpointList;
  }
  if (blockSource === "local-remote-fallback") {
    console.log('PREPARING FALLBACK')
    endpointList.unshift({
      localhost: `${localNodeUrl}:${localNodePort}`
    });
    console.log(endpointList)
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
  console.log(endpointList);
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

module.exports = {
  formatBlock,
  validateBlock,
  validateGetInfo,
  prepareEndpointList,
  getNextEndpoint
};
