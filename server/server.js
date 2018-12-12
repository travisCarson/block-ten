const express = require("express");
const { serverPort, rpcConfig } = require("./config");
require("./controllers/QueueAndResults");

const app = express();

app.set("json spaces", 2);

app.use("/", require("./routes"));

app.listen(serverPort, () => {
  console.log(`block.ten server running on port ${serverPort}`);
  if (rpcConfig.blockSource === "remote") {
  }
});

module.exports = {
  app
};
