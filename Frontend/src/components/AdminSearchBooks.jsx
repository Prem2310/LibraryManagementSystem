import React, { useState, useEffect } from 'react';
import { IoSearchSharp, IoHeartOutline, IoHeart } from 'react-icons/io5';
import axios from 'axios';

const defaultBooksQuery = 'bestsellers'; 

const AdminSearchBooks = () => {
  const [books, setBooks] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedGenre, setSelectedGenre] = useState('');

  const fetchBooks = async (query) => {
    try {
      const response = await axios.get(`https://www.googleapis.com/books/v1/volumes?q=${query}&maxResults=10`);
      return response.data.items?.map(item => ({
        id: item.id,
        title: item.volumeInfo.title,
        authors: item.volumeInfo.authors?.join(', ') || 'Unknown',
        category: item.volumeInfo.categories?.[0] || 'Uncategorized',
        availability: Math.random() > 0.5 ? 'Available' : 'Out of Stock',
        favorite: false,
        image: item.volumeInfo.imageLinks?.thumbnail || 'https://via.placeholder.com/150'
      })) || [];
    } catch (error) {
      console.error('Error fetching books:', error);
      return [];
    }
  };

  useEffect(() => {
    fetchBooks(defaultBooksQuery).then(setBooks);
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    fetchBooks(searchQuery).then(setBooks);
  };

  const toggleFavorite = (id) => {
    setBooks(books.map(book => 
      book.id === id ? { ...book, favorite: !book.favorite } : book
    ));
  };

  const filteredBooks = books.filter(book => 
    (!selectedGenre || book.category.toLowerCase() === selectedGenre.toLowerCase())
  );

  const genres = [...new Set(books.map(book => book.category))];

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <div className="flex justify-center mt-10 mb-8">
        <form onSubmit={handleSearch} className="flex gap-5 justify-between bg-white shadow-sm w-1/2 h-[9vh] px-5 rounded-full border-2 border-orange-400">
          <input 
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

      <div className="flex justify-center gap-4 mb-8">
        <select 
          value={selectedGenre} 
          onChange={(e) => setSelectedGenre(e.target.value)}
          className="p-2 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-400"
        >
          <option value="">All Genres</option>
          {genres.map(genre => (
            <option key={genre} value={genre}>{genre}</option>
          ))}
        </select>
      </div>

      <div className="flex-grow px-16">
        <table className="w-full bg-white shadow-md rounded-lg overflow-hidden">
          <thead className="bg-gray-200 text-gray-700">
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
                <tr key={book.id} className="border-b border-gray-200 hover:bg-gray-50">
                  <td className="py-3 px-4">
                    <img src={book.image} alt={book.title} className="w-20 h-24 object-cover" />
                  </td>
                  <td className="py-3 px-4">{book.title}</td>
                  <td className="py-3 px-4">{book.authors}</td>
                  <td className="py-3 px-4">{book.category}</td>
                  <td className="py-3 px-4">
                    <span className={`inline-block w-3 h-3 rounded-full mr-2 ${book.availability === 'Available' ? 'bg-green-500' : 'bg-red-500'}`}></span>
                    {book.availability}
                  </td>
                  <td className="py-3 px-4">
                    <button onClick={() => toggleFavorite(book.id)} className="text-orange-500 hover:text-orange-600">
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

export default AdminSearchBooks;
