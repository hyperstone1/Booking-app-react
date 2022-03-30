require("dotenv").config({ path: "./config/.env" });
const express = require("express");
const app = express();
const router = require("./routes/index");
const cors = require("cors");
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(cors());
app.use("/api", router);

const start = () => {
  try {
    app.listen(PORT, () => console.log("Сервер запущен..."));
  } catch (e) {
    console.log(e);
  }
};

start();

module.exports = app;
