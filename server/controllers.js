const { formatBlock, hasObjectWithKeyValue } = require("./utils");
const { rpc } = require("./server");
const { apiUrl } = require("./config");
const { localBlocks } = require("./models");

async function getAndFormatBlock(blockNum) {
  const block = await getBlock(blockNum);

  const formatted = formatBlock(block);
  return formatted;
}

async function getLatestBlockNum(tries = 1) {
  let info;
  try {
    info = await rpc.get_info();
  } catch (error) {
    console.log(error);
    if (tries < 3) {
      getLatestBlockNum(tries + 1);
    }
  }
  return info.head_block_num;
}

async function getBlock(number, maxAttempts = 5, attempts = 1) {
  let block;
  try {
    const data = await fetch(`${apiUrl}/v1/chain/get_block`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ block_num_or_id: `${number}` })
    });
    block = await data.json();
  } catch (err) {
    console.log(err);
    if (attempts > maxAttempts) {
      console.log(`Failed to get block ${number}`);
      return null;
    }
    console.log(
      `Failed to get block ${number} ${attempts} times. Trying again`
    );
    return getBlock(number, maxAttempts, attempts + 1);
  }
  if (!block || !block.block_num) {
    console.log(
      `Failed to get block ${number} ${attempts} times. Trying again`
    );
    if (attempts > maxAttempts) {
      console.log(`Failed to get block ${number}`);
      return null;
    }
    return getBlock(number, maxAttempts, attempts + 1);
  }
  return block;
}

async function perpetuateLocalBlocks() {
  const startingBlockNum = await getLatestBlockNum();
  if (!startingBlockNum) {
    console.log("unable to get head block");
    return;
  }
  let nextBlockNum = startingBlockNum;
  setInterval(async () => {
    const newBlock = await getAndFormatBlock(nextBlockNum);
    // console.log(newBlock);
    console.log(newBlock.blockNum);
    if (
      !newBlock.error &&
      !hasObjectWithKeyValue(localBlocks, "blockNum", newBlock.blockNum)
    ) {
      if (localBlocks.length < 10) {
        // console.log(newBlock);
        localBlocks.push(newBlock);
      } else {
        localBlocks.shift();
        localBlocks.push(newBlock);
      }
      nextBlockNum += 1;
    }
  }, 440);
}

async function sendRawBlock(numOrId, res) {
  res.send(await getBlock(numOrId));
}

module.exports = {
  perpetuateLocalBlocks,
  sendRawBlock
};
