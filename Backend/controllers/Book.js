const axios = require("axios");
const Book = require("../models/Book");

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
    res.status(500).json({ message: "Error adding book" });
  }
};

// Update a book
const updateBook = async (req, res) => {
  try {
    const updatedBook = await Book.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.json(updatedBook);
  } catch (error) {
    res.status(500).json({ message: "Error updating book" });
  }
};

// Delete a book
const deleteBook = async (req, res) => {
  try {
    await Book.findByIdAndDelete(req.params.id);
    res.status(204).json();
  } catch (error) {
    res.status(500).json({ message: "Error deleting book" });
  }
};

async function fetchTrendingBooks() {
  const url = `https://www.googleapis.com/books/v1/volumes?q=popular&orderBy=relevance&maxResults=10&key=${process.env.BOOK_API_KEY}`;
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

module.exports = {
  getAllBooks,
  addBook,
  updateBook,
  deleteBook,
  fetchTrendingBooks,
  // You can also export fetchBooks and insertBooks if needed
};
