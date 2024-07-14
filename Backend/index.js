const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const db = require("./config/dbconnect");
const authRoute = require("./routes/Auth");
const bookRoute = require("./routes/Books");
const transactionRoute = require("./routes/Transaction");
const app = express();
require("dotenv").config();

const port = process.env.PORT || 3000;
app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoute);
app.use("/api/books", bookRoute);
app.use("/api/transactions", transactionRoute);
app.get("/", (req, res) => {
  res.send("Backend is working");
});
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
db.connect();
