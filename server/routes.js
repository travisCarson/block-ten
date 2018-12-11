const express = require("express");
const bodyParser = require("body-parser");
const { rpcConfig } = require("./config");
const { sendRawBlock, sendTenBlocks } =
  rpcConfig.blockSource === "remote"
    ? require("./remoteControllers")
    : require("./localControllers");

const router = express.Router();

router.use("/", bodyParser.json());

router.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

router.route("/").get((req, res) => sendTenBlocks(req, res));

router.route("/").post((req, res, next) => {
  sendRawBlock(req, res);
});

module.exports = router;
