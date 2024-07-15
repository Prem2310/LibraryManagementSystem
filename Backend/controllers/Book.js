const axios = require("axios");
const Book = require("../models/Book");
const User = require("../models/User");

// Get all books
const getAllBooks = async (req, res) => {
  try {
    const books = await Book.find();
    res.json(books);
  } catch (error) {
    res.status(500).json({ message: "Error fetching books." });
  }
};

// Add a book
const addBook = async (req, res) => {
  try {
    const newBook = new Book(req.body);
    await newBook.save();
    res.status(201).json(newBook);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error adding book", error: error.message });
  }
};

// Update a book
const updateBook = async (req, res) => {
  try {
    const { id, ...updatedData } = req.body;

    // Find and update the book by the custom `id` field
    const updatedBook = await Book.findOneAndUpdate(
      { id: req.params.id }, // Using the custom `id` field here
      updatedData,
      {
        new: true,
      }
    );

    // Check if the book was found and updated
    if (!updatedBook) {
      return res.status(404).json({ message: "Book not found" });
    }

    res.json(updatedBook);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error updating book", error: error.message });
  }
};

// Delete a book
const deleteBook = async (req, res) => {
  try {
    // Use findOneAndDelete to find the book by the custom `id` field
    const deletedBook = await Book.findOneAndDelete({ id: req.params.id });

    // Check if the book was found and deleted
    if (!deletedBook) {
      return res.status(404).json({ message: "Book not found" });
    }

    res.status(204).json(); // No content on successful deletion
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error deleting book", error: error.message });
  }
};

async function fetchTrendingBooks() {
  const url = `https://www.googleapis.com/books/v1/volumes?q=Science&orderBy=relevance&maxResults=10&key=${process.env.BOOK_API_KEY}`;
  try {
    const response = await axios.get(url);
    const books = response.data.items.map((item) => {
      return {
        kind: item.kind,
        id: item.id,
        etag: item.etag,
        selfLink: item.selfLink,
        volumeInfo: {
          title: item.volumeInfo.title || "",
          authors: item.volumeInfo.authors || [],
          publishedDate: item.volumeInfo.publishedDate || "",
          description: item.volumeInfo.description || "",
          industryIdentifiers: item.volumeInfo.industryIdentifiers || [],
          readingModes: item.volumeInfo.readingModes || {},
          pageCount: item.volumeInfo.pageCount || 0,
          printType: item.volumeInfo.printType || "",
          maturityRating: item.volumeInfo.maturityRating || "",
          allowAnonLogging: item.volumeInfo.allowAnonLogging || false,
          contentVersion: item.volumeInfo.contentVersion || "",
          panelizationSummary: item.volumeInfo.panelizationSummary || {},
          imageLinks: item.volumeInfo.imageLinks || {},
          language: item.volumeInfo.language || "",
          previewLink: item.volumeInfo.previewLink || "",
          infoLink: item.volumeInfo.infoLink || "",
          canonicalVolumeLink: item.volumeInfo.canonicalVolumeLink || "",
        },
        saleInfo: item.saleInfo || {},
        accessInfo: item.accessInfo || {},
        searchInfo: item.searchInfo || {},
      };
    });
    return { items: books };
  } catch (error) {
    console.error(
      "Error fetching trending books:",
      error.response ? error.response.data : error.message
    );
    throw error;
  }
}

// Borrow a book
const borrowBook = async (req, res) => {
  try {
    const { userId, bookId } = req.body; // Get user ID and book ID from the request body

    // Find the book
    console.log("Borrowing book with ID:", bookId);
    const book = await Book.findById(bookId);
    console.log("Book found:", book);
    if (!book) {
      return res.status(404).json({ message: "Book not found" });
    }

    // Check if there are available copies
    if (book.numOfCopies <= 0) {
      return res
        .status(400)
        .json({ message: "No copies available for borrowing" });
    }

    // Decrement the number of available copies
    book.numOfCopies -= 1; // Decrease count by one
    if (book.numOfCopies === 0) {
      book.isAvailable = false; // Mark book as not available if no copies are left
    }

    await book.save(); // Save the updated book

    // Find the user by userId
    const user = await User.findOne({ userId });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Update the user's borrowedBooks
    user.borrowedBooks.push(bookId); // Add book to the user's borrowed list
    await user.save(); // Save the updated user

    res.status(200).json({ message: "Book borrowed successfully", book });
  } catch (error) {
    console.error("Error borrowing book:", error);
    res
      .status(500)
      .json({ message: "Error borrowing book", error: error.message });
  }
};

module.exports = {
  getAllBooks,
  addBook,
  updateBook,
  deleteBook,
  fetchTrendingBooks,
  borrowBook,
};
