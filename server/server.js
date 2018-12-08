const express = require("express");
const bodyParser = require("body-parser");
const fetch = require("node-fetch");
const { JsonRpc } = require("eosjs");
const { perpetuateLocalBlocks } = require("./controllers");
const { port, blockInfoUrl } = require("./config");

console.log(blockInfoUrl);

const rpc = new JsonRpc(blockInfoUrl, { fetch });
const app = express();

app.use(bodyParser.json());
app.set("json spaces", 2);

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

app.listen(1111, () => {
  console.log(`block.ten server running on port ${port}`);
  perpetuateLocalBlocks();
});

module.exports = {
  rpc,
  app
};
