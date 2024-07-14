const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  title: { type: String, required: true },
  authors: [{ type: String }],
  description: { type: String },
  category: { type: String },
  imageLink: { type: String },
  numOfCopies: { type: Number, default: 1 },
  isAvailable: { type: Boolean, default: true },
});

module.exports = mongoose.model("Book", bookSchema);
