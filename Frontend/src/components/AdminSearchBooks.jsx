import { useState, useEffect } from "react";
import { IoSearchSharp, IoFilterOutline } from "react-icons/io5";
import axios from "axios";
import { useUser } from "@clerk/clerk-react";

const AdminSearchBooks = () => {
  const { user } = useUser(); // Get user metadata from Clerk
  const userId = user ? user.id : null; // Get user ID
  console.log("userId", userId);

  const [books, setBooks] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedGenre, setSelectedGenre] = useState("");
  const [loading, setLoading] = useState(true);

  const fetchBooks = async (query = "") => {
    // console.log(userId);
    setLoading(true);
    try {
      const response = await axios.get(
        `http://localhost:3000/api/books?q=${query}`
      );
      const mappedBooks = response.data.map((book) => ({
        id: book._id, // Assuming _id is the unique identifier
        title: book.title,
        authors: book.authors.join(", ") || "Unknown",
        category: book.categories?.[0] || "Uncategorized",
        availability: book.available > 0 ? "Available" : "Out of Stock",
        favorite: false,
        image: book.imageLinks?.thumbnail || "https://via.placeholder.com/150",
      }));
      setBooks(mappedBooks);
    } catch (error) {
      console.error("Error fetching books:", error);
      setBooks([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBooks(""); // Fetch all books initially
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    fetchBooks(searchQuery); // Fetch books based on the search query
  };

  const filteredBooks = books.filter(
    (book) =>
      !selectedGenre ||
      book.category.toLowerCase() === selectedGenre.toLowerCase()
  );

  const genres = [...new Set(books.map((book) => book.category))];

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-orange-100 to-white p-8">
      <div className="max-w-7xl mx-auto w-full">
        <h1 className="text-4xl font-bold text-gray-800 mb-8 text-center">
          Admin Book Search
        </h1>

        <div className="flex flex-col md:flex-row justify-center items-center gap-4 mb-8">
          <form
            onSubmit={handleSearch}
            className="flex-grow w-full md:w-2/3 max-w-3xl"
          >
            <div className="flex gap-2 bg-white shadow-sm h-12 px-4 rounded-full border-2 border-orange-400">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search for books by name, author, or genre..."
                className="flex-grow bg-transparent text-lg leading-6 text-gray-700 focus:outline-none"
              />
              <button
                type="submit"
                className="flex items-center justify-center text-orange-500 text-2xl hover:text-orange-600"
              >
                <IoSearchSharp />
              </button>
            </div>
          </form>

          <div className="flex items-center">
            <IoFilterOutline className="text-orange-500 mr-2" />
            <select
              value={selectedGenre}
              onChange={(e) => setSelectedGenre(e.target.value)}
              className="p-2 rounded-full border border-orange-400 focus:outline-none focus:ring-2 focus:ring-orange-400 bg-white"
            >
              <option value="">All Genres</option>
              {genres.map((genre) => (
                <option key={genre} value={genre}>
                  {genre}
                </option>
              ))}
            </select>
          </div>
        </div>

        {loading ? (
          <div className="text-center py-8">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500 mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading books...</p>
          </div>
        ) : (
          <div className="bg-white shadow-lg rounded-lg overflow-hidden">
            <table className="w-full">
              <thead className="bg-orange-100 text-gray-700">
                <tr>
                  <th className="py-3 px-4 text-left">Image</th>
                  <th className="py-3 px-4 text-left">Title</th>
                  <th className="py-3 px-4 text-left">Authors</th>
                  <th className="py-3 px-4 text-left">Category</th>
                  <th className="py-3 px-4 text-left">Availability</th>
                </tr>
              </thead>
              <tbody>
                {filteredBooks.length > 0 ? (
                  filteredBooks.map((book) => (
                    <tr
                      key={book.id}
                      className="border-b border-gray-200 hover:bg-gray-50 transition-colors duration-150"
                    >
                      <td className="py-3 px-4">
                        <img
                          src={book.image}
                          alt={book.title}
                          className="w-20 h-24 object-cover rounded shadow"
                        />
                      </td>
                      <td className="py-3 px-4 font-medium">{book.title}</td>
                      <td className="py-3 px-4 text-gray-600">
                        {book.authors}
                      </td>
                      <td className="py-3 px-4 text-gray-600">
                        {book.category}
                      </td>
                      <td className="py-3 px-4">
                        <span
                          className={`inline-block px-2 py-1 rounded-full text-xs font-semibold ${
                            book.availability === "Available"
                              ? "bg-green-100 text-green-800"
                              : "bg-red-100 text-red-800"
                          }`}
                        >
                          {book.availability}
                        </span>
                      </td>
                      <td className="py-3 px-4"></td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan="5"
                      className="py-8 px-4 text-center text-gray-500"
                    >
                      No books found. Try a different search query.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminSearchBooks;
