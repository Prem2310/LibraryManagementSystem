import { useState } from 'react';

const dummyBorrowedBooks = [
  {
    id: '1',
    title: 'Don\'t Make Me Think',
    author: 'Steve Krug',
    borrowedOn: '2024-07-01',
    dueDate: '2024-07-10',
    cover: '/path/to/cover1.jpg',
    status: 'Borrowed',
    rating: '4.5/5',
  },
  {
    id: '2',
    title: 'Rich Dad Poor Dad',
    author: 'Robert T. Kiyosaki',
    borrowedOn: '2024-07-03',
    dueDate: '2024-07-15',
    cover: '/path/to/cover2.jpg',
    status: 'E-BOOK',
    rating: '5/5',
  },
  {
    id: '3',
    title: 'The Design of Everyday Things',
    author: 'Don Norman',
    borrowedOn: '2024-06-15',
    dueDate: '2024-06-25',
    cover: '/path/to/cover3.jpg',
    status: 'Borrowed',
    rating: '4.5/5',
  },
];

const UserShelf = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [borrowedBooks, setBorrowedBooks] = useState(dummyBorrowedBooks);

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredBooks = borrowedBooks.filter(book =>
    book.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="flex justify-center mb-8">
        <h1 className="text-3xl font-bold text-orange-500">My Borrowed Books</h1>
      </div>

      <div className="flex justify-center mb-8">
        <input
          type="text"
          value={searchTerm}
          onChange={handleSearch}
          placeholder="Search your books..."
          className="w-full max-w-md p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredBooks.map(book => (
          <div key={book.id} className="bg-white p-6 rounded-lg shadow-md flex flex-col items-center">
            <img src={book.cover} alt={book.title} className="w-32 h-40 object-cover mb-4 rounded-md" />
            <h2 className="text-lg font-semibold text-gray-700">{book.title}</h2>
            <p className="text-gray-500 mb-2">{book.author}</p>
            <p className="text-sm text-gray-500">Borrowed on: {new Date(book.borrowedOn).toLocaleDateString()}</p>
            <p className="text-sm text-gray-500 mb-4">Due: {new Date(book.dueDate).toLocaleDateString()}</p>
            <div className="flex justify-between items-center w-full">
              <p className={`text-sm font-semibold ${book.status === 'Borrowed' ? 'text-red-500' : 'text-green-500'}`}>{book.status}</p>
              <button className="px-3 py-1 rounded-full bg-orange-500 text-white hover:bg-orange-600">Return</button>
            </div>
            <p className="text-sm text-gray-500 mt-2">Rating: {book.rating}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserShelf;
