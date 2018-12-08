const { app } = require("./server");
const { sendRawBlock, localBlocks } = require("./controllers");

app.get("/", (req, res) => {
  res.send(localBlocks);
});

app.post(
  "/",
  (req, res, next) => {
    req = req.body;
    next();
  },
  (req, res) => sendRawBlock(req, res)
);
