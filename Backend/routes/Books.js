const express = require("express");
const router = express.Router();
const {
  getAllBooks,
  addBook,
  updateBook,
  deleteBook,
  fetchTrendingBooks,
  borrowBook,
} = require("../controllers/Book");

// Define routes
router.get("/", getAllBooks);
router.post("/", addBook);
router.put("/:id", updateBook);
router.delete("/:id", deleteBook);
router.post("/borrow", borrowBook);

router.get("/trending", async (req, res) => {
  try {
    const trendingBooks = await fetchTrendingBooks();
    res.json(trendingBooks);
  } catch (error) {
    res.status(500).json({ message: "Error fetching trending books." });
  }
});

module.exports = router;
