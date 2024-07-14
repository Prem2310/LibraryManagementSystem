const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const db = require("./config/dbconnect");
const app = express();
require("dotenv").config();

const port = process.env.PORT || 3000;
app.use(cors());
app.use(express.json());
app.get("/", (req, res) => {
  res.send("Backend is working");
});
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
db.connect();