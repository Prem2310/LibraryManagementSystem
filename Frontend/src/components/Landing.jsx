import { IoSearchSharp } from "react-icons/io5";
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const SAMPLE_ISBNS = [
  '9781787123427', '9780132350884', '9780201633610', '9780596007126', '9780134685991',
  '9780596516178', '9780132350884', '9780735619678', '9780201835953', '9780321146530'
];

const fetchBookData = async (isbn) => {
  try {
    const response = await axios.get(`https://www.googleapis.com/books/v1/volumes?q=isbn:${isbn}`);
    return response.data.items?.[0]?.volumeInfo;
  } catch (error) {
    console.error('Error fetching book data:', error);
    return null;
  }
};

const searchBooks = async (query) => {
  try {
    const response = await axios.get(`https://www.googleapis.com/books/v1/volumes?q=${query}&maxResults=10`);
    return response.data.items?.map(item => item.volumeInfo) || [];
  } catch (error) {
    console.error('Error searching books:', error);
    return [];
  }
};

const BookCard = ({ book }) => (
  <div className="flex flex-col items-center p-4 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
    <img src={book.imageLinks?.thumbnail || 'https://via.placeholder.com/128x192.png?text=No+Cover'} alt={book.title} className="w-32 h-48 object-cover mb-2 rounded" />
    <h3 className="text-sm font-semibold text-center line-clamp-2">{book.title}</h3>
    <p className="text-xs text-gray-600 mt-1">{book.authors?.[0] || 'Unknown Author'}</p>
  </div>
);

export default function Landing() {
  const [newArrivals, setNewArrivals] = useState([]);
  const [trendingBooks, setTrendingBooks] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const fetchInitialBooks = async () => {
      const newArrivalsData = await Promise.all(
        SAMPLE_ISBNS.slice(0, 5).map(isbn => fetchBookData(isbn))
      );
      const trendingBooksData = await Promise.all(
        SAMPLE_ISBNS.slice(5, 10).map(isbn => fetchBookData(isbn))
      );
      setNewArrivals(newArrivalsData.filter(book => book !== null));
      setTrendingBooks(trendingBooksData.filter(book => book !== null));
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
    <div className="flex flex-col gap-8 min-h-screen">
      <div className="flex justify-center mt-10">
        <form onSubmit={handleSearch} className="flex gap-5 justify-between bg-white shadow-sm w-1/2 h-[9vh] px-5 rounded-full border-2 border-orange-400">
          <input 
            id="searchInput"
            type="text" 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search for books by name, author, or genre..." 
            className="flex-grow bg-transparent text-xl leading-6 text-gray-700 focus:outline-none" 
          />
          <button type="submit" className="flex items-center justify-center my-auto text-orange-500 text-2xl hover:text-orange-600">
            <IoSearchSharp />
          </button>
        </form>
      </div>

      <div className="flex flex-col gap-12 px-16">
        {searchResults.length > 0 ? (
          <div className="flex flex-col">
            <h2 className="text-2xl font-bold mb-4 text-gray-800">Search Results</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
              {searchResults.map((book, index) => (
                <BookCard key={`search-${index}`} book={book} />
              ))}
            </div>
          </div>
        ) : (
          <>
            <div className="flex flex-col">
              <h2 className="text-2xl font-bold mb-4 text-gray-800">New Arrivals</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
                {newArrivals.map((book, index) => (
                  <BookCard key={`new-${index}`} book={book} />
                ))}
              </div>
            </div>
            <div className="flex flex-col">
              <h2 className="text-2xl font-bold mb-4 text-gray-800">Trending Books</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
                {trendingBooks.map((book, index) => (
                  <BookCard key={`trend-${index}`} book={book} />
                ))}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}