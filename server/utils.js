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

async function handleError(error, customMessage) {
  console.log(customMessage);
  console.log(error);
}

module.exports = {
  formatBlock,
  validateBlock,
  handleError
};
