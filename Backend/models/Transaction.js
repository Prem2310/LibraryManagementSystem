const mongoose = require("mongoose");

const transactionSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  bookId: { type: mongoose.Schema.Types.ObjectId, ref: "Book", required: true },
  checkoutDate: { type: Date, default: Date.now },
  returnDate: { type: Date },
  dueDate: { type: Date },
  lateFees: { type: Number, default: 0 },
});

module.exports = mongoose.model("Transaction", transactionSchema);
