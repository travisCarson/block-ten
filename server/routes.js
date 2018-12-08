const express = require("express");
const bodyParser = require("body-parser");
const { sendRawBlock, sendBlocks } = require("./controllers");

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

router.route("/").get((req, res) => sendBlocks(req, res));

router
  .route("/")
  .get(() => console.log("router thing"))
  .post((req, res, next) => {
    sendRawBlock(req, res);
  });

module.exports = router;
