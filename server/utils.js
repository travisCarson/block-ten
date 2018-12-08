const hasObjectWithKeyValue = function hasObjectWithKeyValue(
  array,
  key,
  value
) {
  for (let i = 0; i < array.length; i++) {
    if (array[i][key] && array[i][key] === value) {
      return true;
    }
  }
  return false;
};

/* eslint-disable camelcase */
const formatBlock = function formatBlock(rawBlock) {
  if (!rawBlock) {
    const error = "no data received";
    return { blockNum: rawBlock, error };
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
  return { blockNum: block_num, id, timestamp, actionCount };
};

module.exports = {
  hasObjectWithKeyValue,
  formatBlock
};
