import { useState, useEffect } from "react";
import { IoSearchSharp, IoHeartOutline, IoHeart } from "react-icons/io5";
import axios from "axios";
import { useUser } from "@clerk/clerk-react";

const SearchBooks = () => {
  const { user } = useUser(); // Get user metadata from Clerk
  const userId = user ? user.id : null; // Get user ID

  const [books, setBooks] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedGenre, setSelectedGenre] = useState("");

  const fetchBooks = async (query = "") => {
    try {
      const response = await axios.get(
        `http://localhost:3000/api/books?q=${query}`
      );
      const mappedBooks = response.data.map((book) => ({
        ...book,
        category: book.categories ? book.categories[0] : "Unknown", // Handle missing categories
        isAvailable: book.available > 0, // Assuming 'available' is a number indicating available copies
        imageLink:
          book.imageLinks && book.imageLinks.thumbnail
            ? book.imageLinks.thumbnail
            : "default_image_url", // Provide a default image URL if thumbnail is missing
      }));
      setBooks(mappedBooks);
    } catch (error) {
      console.error("Error fetching books:", error);
    }
  };

  useEffect(() => {
    fetchBooks(""); // Fetch all books initially
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    fetchBooks(searchQuery); // Fetch books based on the search query
  };

  const toggleFavorite = (id) => {
    setBooks(
      books.map((book) =>
        book._id === id ? { ...book, favorite: !book.favorite } : book
      )
    );
  };

  const borrowBook = async (bookId) => {
    if (!userId) {
      console.error("User is not authenticated.");
      return;
    }
    const requestBody = { userId, bookId }; // Prepare the request body
    console.log("Borrowing book with ID:", bookId); // Log the book ID
    console.log("Request body:", requestBody); // Log the request body

    try {
      const response = await axios.post(
        `http://localhost:3000/api/books/borrow`,
        requestBody
      );
      console.log(response.data);
    } catch (error) {
      console.error(
        "Error borrowing book:",
        error.response ? error.response.data : error.message
      );
    }
  };

  const filteredBooks = books.filter((book) => {
    const matchesGenre =
      !selectedGenre ||
      (book.category &&
        book.category.toLowerCase() === selectedGenre.toLowerCase());
    const matchesSearch =
      !searchQuery ||
      (book.title &&
        book.title.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (book.authors &&
        book.authors.some((author) =>
          author.toLowerCase().includes(searchQuery.toLowerCase())
        )) ||
      (book.category &&
        book.category.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesGenre && matchesSearch;
  });

  const genres = [
    ...new Set(books.map((book) => book.category).filter(Boolean)),
  ]; // Filter out any falsy values

  return (
    <div className="flex flex-col min-h-screen  bg-gray-100 w-[90vw]  ">
      <div className="flex justify-center mt-10 mb-8">
        <form
          onSubmit={handleSearch}
          className="flex gap-5 justify-between bg-white shadow-sm w-1/2 h-[9vh] px-5 rounded-full border-2 border-orange-400"
        >
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search for books by name, author, or genre..."
            className="flex-grow bg-transparent text-xl leading-6 text-gray-700 focus:outline-none"
          />
          <button
            type="submit"
            className="flex items-center justify-center my-auto text-orange-500 text-2xl hover:text-orange-600"
          >
            <IoSearchSharp />
          </button>
        </form>
      </div>

      <div className="flex justify-center gap-4 mb-8">
        <select
          value={selectedGenre}
          onChange={(e) => setSelectedGenre(e.target.value)}
          className="p-2 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-400"
        >
          <option value="">All Genres</option>
          {genres.map((genre) => (
            <option key={genre} value={genre}>
              {genre}
            </option>
          ))}
        </select>
      </div>

      <div className="flex-grow px-16">
        <table className="w-full bg-white shadow-md rounded-lg overflow-hidden">
          <thead className="bg-orange-200 text-gray-700">
            <tr>
              <th className="py-3 px-4 text-left">Image</th>
              <th className="py-3 px-4 text-left">Title</th>
              <th className="py-3 px-4 text-left">Authors</th>
              <th className="py-3 px-4 text-left">Category</th>
              <th className="py-3 px-4 text-left">Availability</th>
              <th className="py-3 px-4 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredBooks.length > 0 ? (
              filteredBooks.map((book) => (
                <tr
                  key={book._id}
                  className="border-b border-gray-200 hover:bg-gray-50"
                >
                  <td className="py-3 px-4">
                    <img
                      src={book.imageLink}
                      alt={book.title}
                      className="w-20 h-24 object-cover"
                    />
                  </td>
                  <td className="py-3 px-4">{book.title}</td>
                  <td className="py-3 px-2">{book.authors.join(", ")}</td>
                  <td className="py-3 px-4">{book.category}</td>
                  <td className="py-3 px-4">
                    <span
                      className={`inline-block w-3 h-3 rounded-full mr-2 ${
                        book.isAvailable ? "bg-green-500" : "bg-red-500"
                      }`}
                    ></span>
                    {book.isAvailable ? "Available" : "Out of Stock"}
                  </td>
                  <td className="py-3 px-4 flex gap-2 mt-8">
                    <button
                      onClick={() => borrowBook(book._id)}
                      className={`px-3 py-1 rounded-full text-white ${
                        book.isAvailable
                          ? "bg-orange-500 hover:bg-orange-600"
                          : "bg-gray-500 hover:bg-gray-600"
                      }`}
                      disabled={!book.isAvailable}
                    >
                      {book.isAvailable ? "Borrow" : "Notify"}
                    </button>
                    <button
                      onClick={() => toggleFavorite(book._id)}
                      className="text-orange-500 hover:text-orange-600"
                    >
                      {book.favorite ? <IoHeart /> : <IoHeartOutline />}
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="py-4 px-4 text-center text-gray-500">
                  No books found. Try a different search query.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default SearchBooks;
