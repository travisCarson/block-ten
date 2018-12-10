const express = require("express");
const { port } = require("./config");

const app = express();

app.set("json spaces", 2);

app.use("/", require("./routes"));

app.listen(port, () => {
  console.log(`block.ten server running on port ${port}`);
});

module.exports = {
  app
};
