import { IoSearchSharp} from "react-icons/io5";
import React, { useState, useEffect } from "react";
import axios from "axios";


const SAMPLE_ISBNS = [
  "9781787123427",
  "9780132350884",
  "9780201633610",
  "9780596007126",
  "9780134685991",
  "9780596516178",
  "9780132350884",
  "9780735619678",
  "9780201835953",
  "9780321146530",
];

const fetchBookData = async (isbn) => {
  try {
    const response = await axios.get(
      `https://www.googleapis.com/books/v1/volumes?q=isbn:${isbn}`
    );
    return response.data.items?.[0]?.volumeInfo;
  } catch (error) {
    console.error("Error fetching book data:", error);
    return null;
  }
};

const searchBooks = async (query) => {
  try {
    const response = await axios.get(
      `https://www.googleapis.com/books/v1/volumes?q=${query}&maxResults=10`
    );
    return response.data.items?.map((item) => item.volumeInfo) || [];
  } catch (error) {
    console.error("Error searching books:", error);
    return [];
  }
};

const BookCard = ({ book }) => (
  <div className="flex flex-col items-center p-6 bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
    <img
      src={
        book.imageLinks?.thumbnail ||
        "https://via.placeholder.com/128x192.png?text=No+Cover"
      }
      alt={book.title}
      className="w-32 h-48 object-cover mb-4 rounded-lg shadow-md"
    />
    <h3 className="text-lg font-semibold text-center line-clamp-2 text-gray-800">
      {book.title}
    </h3>
    <p className="text-sm text-gray-600 mt-2">
      {book.authors?.[0] || "Unknown Author"}
    </p>
  </div>
);

export default function Landing() {
  const [newArrivals, setNewArrivals] = useState([]);
  const [trendingBooks, setTrendingBooks] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const fetchInitialBooks = async () => {
      const newArrivalsData = await Promise.all(
        SAMPLE_ISBNS.slice(0, 5).map((isbn) => fetchBookData(isbn))
      );
      const trendingBooksData = await Promise.all(
        SAMPLE_ISBNS.slice(5, 10).map((isbn) => fetchBookData(isbn))
      );
      setNewArrivals(newArrivalsData.filter((book) => book !== null));
      setTrendingBooks(trendingBooksData.filter((book) => book !== null));
    };

    fetchInitialBooks();
  }, []);

  useEffect(() => {
    const delayDebounce = setTimeout(async () => {
      if (searchQuery) {
        const results = await searchBooks(searchQuery);
        setSearchResults(results);
      } else {
        setSearchResults([]);
      }
    }, 300);

    return () => clearTimeout(delayDebounce);
  }, [searchQuery]);

  const handleSearch = async (e) => {
    e.preventDefault();
    if (searchQuery) {
      const results = await searchBooks(searchQuery);
      setSearchResults(results);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-orange-100 to-white">
      <main className="flex-grow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Welcome to Your Public Library
            </h1>
            <p className="text-xl text-gray-600">
              Discover, Learn, and Grow with Our Vast Collection
            </p>
          </div>

          <div className="flex justify-center mb-12">
            <form onSubmit={handleSearch} className="flex w-full max-w-3xl">
              <input
                id="searchInput"
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Discover your next favorite book..."
                className="w-full px-6 py-4 text-lg bg-white border-2 border-orange-400 rounded-l-full focus:outline-none focus:ring-2 focus:ring-orange-300"
              />
              <button
                type="submit"
                className="px-6 bg-orange-500 text-white rounded-r-full hover:bg-orange-600 transition-colors duration-300">
                <IoSearchSharp className="text-2xl" />
              </button>
            </form>
          </div>

          {searchResults.length > 0 ? (
            <div className="mb-12">
              <h2 className="text-3xl font-bold mb-8 text-gray-800">
                Search Results
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8">
                {searchResults.map((book, index) => (
                  <BookCard key={`search-${index}`} book={book} />
                ))}
              </div>
            </div>
          ) : (
            <>
              <div className="mb-12">
                <h2 className="text-3xl font-bold mb-8 text-gray-800">
                  New Arrivals
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8">
                  {newArrivals.map((book, index) => (
                    <BookCard key={`new-${index}`} book={book} />
                  ))}
                </div>
              </div>
              <div className="mb-12">
                <h2 className="text-3xl font-bold mb-8 text-gray-800">
                  Trending Books
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8">
                  {trendingBooks.map((book, index) => (
                    <BookCard key={`trend-${index}`} book={book} />
                  ))}
                </div>
              </div>
            </>
          )}
        </div>
      </main>
    </div>
  );
}
