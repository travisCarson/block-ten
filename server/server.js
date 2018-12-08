const express = require("express");
const { port } = require("./config");
const { perpetuateLocalBlocks } = require("./controllers");

const app = express();

app.set("json spaces", 2);

app.use("/", require("./routes"));

app.listen(port, () => {
  console.log(`block.ten server running on port ${port}`);
  perpetuateLocalBlocks();
});

module.exports = {
  app
};
