const express = require("express");
const mongoose = require("mongoose");
const config = require("./config/key");
const app = express();
const port = 5000;

mongoose
  .connect(config.mongoURI)
  .then(() => console.log("mongoDB connected.."))
  .catch((err) => console.log(err));

app.get("/", (req, res) => res.send("Hello,반갑습니다!"));
app.listen(port, () => console.log(`ex listen on port ${port}!`));
