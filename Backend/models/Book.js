const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema({
  isbn: { type: String, unique: true, required: true },
  numOfCopies: { type: Number, default: 1 },
  isAvailable: { type: Boolean, default: true },
});

module.exports = mongoose.model("Book", bookSchema);
