// import React, { useState, useEffect } from 'react';
// import { IoNotificationsOutline } from 'react-icons/io5';
// import { Bar } from 'react-chartjs-2';
// import Chart from 'chart.js/auto';

// const dummyTransactions = [
//   {
//     _id: '1',
//     userId: { _id: 'user1', name: 'John Doe' },
//     bookId: { _id: 'book1', title: 'Don\'t Make Me Think' },
//     checkoutDate: new Date('2024-07-01'),
//     dueDate: new Date('2024-07-10'),
//     returnDate: null,
//     lateFees: 0,
//   },
//   {
//     _id: '2',
//     userId: { _id: 'user2', name: 'Jane Smith' },
//     bookId: { _id: 'book2', title: 'The Design of Everyday Things' },
//     checkoutDate: new Date('2024-06-15'),
//     dueDate: new Date('2024-06-25'),
//     returnDate: new Date('2024-06-28'),
//     lateFees: 0,
//   },
//   {
//     _id: '3',
//     userId: { _id: 'user3', name: 'Alice Johnson' },
//     bookId: { _id: 'book3', title: 'Rich Dad Poor Dad' },
//     checkoutDate: new Date('2024-07-05'),
//     dueDate: new Date('2024-07-15'),
//     returnDate: null,
//     lateFees: 50,
//   },
// ];

// const dummyStats = {
//   totalBooksBorrowedThisWeek: 10,
//   totalBooksBorrowedThisMonth: 40,
//   totalBooksAvailable: 150,
//   totalBooksLeftToReturn: 25,
// };

// const graphData = {
//   labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
//   datasets: [
//     {
//       label: 'Books Borrowed',
//       data: [5, 10, 7, 15],
//       backgroundColor: 'rgba(249, 115, 22, 0.6)',
//       borderColor: 'rgba(249, 115, 22, 1)',
//       borderWidth: 1,
//     },
//   ],
// };

// const LibStats = () => {
//   const [transactions, setTransactions] = useState([]);
//   const [stats, setStats] = useState(dummyStats);

//   useEffect(() => {
//     setTransactions(dummyTransactions);
//   }, []);

//   const notifyUser = (userId) => {
//     alert(`Notification sent to user ID: ${userId}`);
//   };

//   return (
//     <div className="min-h-screen bg-gray-100 p-8">
//       <div className="flex justify-center mb-8">
//         <h1 className="text-3xl font-bold text-orange-500">Library Dashboard</h1>
//       </div>

//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
//         <div className="bg-white p-6 rounded-lg shadow-md">
//           <h2 className="text-xl font-semibold text-gray-700">Books Borrowed This Week</h2>
//           <p className="mt-4 text-3xl text-orange-500">{stats.totalBooksBorrowedThisWeek}</p>
//         </div>
//         <div className="bg-white p-6 rounded-lg shadow-md">
//           <h2 className="text-xl font-semibold text-gray-700">Books Borrowed This Month</h2>
//           <p className="mt-4 text-3xl text-orange-500">{stats.totalBooksBorrowedThisMonth}</p>
//         </div>
//         <div className="bg-white p-6 rounded-lg shadow-md">
//           <h2 className="text-xl font-semibold text-gray-700">Total Books Available</h2>
//           <p className="mt-4 text-3xl text-orange-500">{stats.totalBooksAvailable}</p>
//         </div>
//         <div className="bg-white p-6 rounded-lg shadow-md">
//           <h2 className="text-xl font-semibold text-gray-700">Books Left to Return</h2>
//           <p className="mt-4 text-3xl text-orange-500">{stats.totalBooksLeftToReturn}</p>
//         </div>
//       </div>

//       <div className="bg-white p-6 rounded-lg shadow-md mb-8">
//         <h2 className="text-xl font-semibold text-gray-700 mb-4">Books Borrowed Over Time</h2>
//         <Bar data={graphData} />
//       </div>

//       <div className="bg-white p-6 rounded-lg shadow-md">
//         <table className="w-full table-auto">
//           <thead className="bg-orange-200 text-gray-700">
//             <tr>
//               <th className="py-3 px-4 text-left">User</th>
//               <th className="py-3 px-4 text-left">Book</th>
//               <th className="py-3 px-4 text-left">Checkout Date</th>
//               <th className="py-3 px-4 text-left">Due Date</th>
//               <th className="py-3 px-4 text-left">Return Date</th>
//               <th className="py-3 px-4 text-left">Late Fees</th>
//               <th className="py-3 px-4 text-left">Actions</th>
//             </tr>
//           </thead>
//           <tbody>
//             {transactions.length > 0 ? (
//               transactions.map((transaction) => {
//                 const isOverdue = transaction.dueDate && new Date(transaction.dueDate) < new Date();
//                 return (
//                   <tr key={transaction._id} className={`border-b border-gray-200 hover:bg-gray-50 ${isOverdue ? 'bg-red-100' : ''}`}>
//                     <td className="py-3 px-4">{transaction.userId.name}</td>
//                     <td className="py-3 px-4">{transaction.bookId.title}</td>
//                     <td className="py-3 px-4">{new Date(transaction.checkoutDate).toLocaleDateString()}</td>
//                     <td className="py-3 px-4">{transaction.dueDate ? new Date(transaction.dueDate).toLocaleDateString() : 'N/A'}</td>
//                     <td className="py-3 px-4">{transaction.returnDate ? new Date(transaction.returnDate).toLocaleDateString() : 'N/A'}</td>
//                     <td className="py-3 px-4">{transaction.lateFees}</td>
//                     <td className="py-3 px-4">
//                       <button
//                         onClick={() => notifyUser(transaction.userId._id)}
//                         className="px-3 py-1 rounded-full bg-orange-500 text-white hover:bg-orange-600"
//                       >
//                         <IoNotificationsOutline className="inline-block mr-1" /> Notify
//                       </button>
//                     </td>
//                   </tr>
//                 );
//               })
//             ) : (
//               <tr>
//                 <td colSpan="7" className="py-4 px-4 text-center text-gray-500">
//                   No transactions found.
//                 </td>
//               </tr>
//             )}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// };

// export default LibStats;

import React, { useState, useEffect } from 'react';
import { IoNotificationsOutline, IoBookOutline, IoCalendarOutline, IoWalletOutline, IoArrowUpCircleOutline } from 'react-icons/io5';
import { Bar } from 'react-chartjs-2';
import Chart from 'chart.js/auto';

const dummyTransactions = [
  {
    _id: '1',
    userId: { _id: 'user1', name: 'John Doe' },
    bookId: { _id: 'book1', title: 'Don\'t Make Me Think' },
    checkoutDate: new Date('2024-07-01'),
    dueDate: new Date('2024-07-10'),
    returnDate: null,
    lateFees: 0,
  },
  {
    _id: '2',
    userId: { _id: 'user2', name: 'Jane Smith' },
    bookId: { _id: 'book2', title: 'The Design of Everyday Things' },
    checkoutDate: new Date('2024-06-15'),
    dueDate: new Date('2024-06-25'),
    returnDate: new Date('2024-06-28'),
    lateFees: 0,
  },
  {
    _id: '3',
    userId: { _id: 'user3', name: 'Alice Johnson' },
    bookId: { _id: 'book3', title: 'Rich Dad Poor Dad' },
    checkoutDate: new Date('2024-07-05'),
    dueDate: new Date('2024-07-15'),
    returnDate: null,
    lateFees: 50,
  },
];

const dummyStats = {
  totalBooksBorrowedThisWeek: 10,
  totalBooksBorrowedThisMonth: 40,
  totalBooksAvailable: 150,
  totalBooksLeftToReturn: 25,
};

const graphData = {
  labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
  datasets: [
    {
      label: 'Books Borrowed',
      data: [5, 10, 7, 15],
      backgroundColor: [
        'rgba(255, 99, 132, 0.8)',
        'rgba(54, 162, 235, 0.8)',
        'rgba(255, 206, 86, 0.8)',
        'rgba(75, 192, 192, 0.8)',
      ],
      borderColor: [
        'rgba(255, 99, 132, 1)',
        'rgba(54, 162, 235, 1)',
        'rgba(255, 206, 86, 1)',
        'rgba(75, 192, 192, 1)',
      ],
      borderWidth: 1,
      borderRadius: 5,
    },
  ],
};

const StatCard = ({ title, value, icon }) => (
  <div className="bg-white p-6 rounded-xl shadow-md transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
    <div className="flex items-center justify-between mb-4">
      <h2 className="text-lg font-semibold text-gray-700">{title}</h2>
      {icon}
    </div>
    <p className="text-3xl font-bold text-orange-500">{value}</p>
  </div>
);

const LibStats = () => {
  const [transactions, setTransactions] = useState([]);
  const [stats, setStats] = useState(dummyStats);

  useEffect(() => {
    setTransactions(dummyTransactions);
  }, []);

  const notifyUser = (userId) => {
    alert(`Notification sent to user ID: ${userId}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-100 to-white p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800">Library Dashboard</h1>
          
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatCard 
            title="Books Borrowed This Week" 
            value={stats.totalBooksBorrowedThisWeek}
            icon={<IoBookOutline className="text-3xl text-orange-500" />}
          />
          <StatCard 
            title="Books Borrowed This Month" 
            value={stats.totalBooksBorrowedThisMonth}
            icon={<IoCalendarOutline className="text-3xl text-orange-500" />}
          />
          <StatCard 
            title="Total Books Available" 
            value={stats.totalBooksAvailable}
            icon={<IoBookOutline className="text-3xl text-orange-500" />}
          />
          <StatCard 
            title="Books Left to Return" 
            value={stats.totalBooksLeftToReturn}
            icon={<IoWalletOutline className="text-3xl text-orange-500" />}
          />
        </div>

        <div className="bg-white p-6 rounded-xl shadow-md mb-8">
          <h2 className="text-2xl font-semibold text-gray-700 mb-4">Books Borrowed Over Time</h2>
          <div className="w-full md:w-2/3 lg:w-1/2 mx-auto">
            <Bar 
              data={graphData} 
              options={{
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                  legend: {
                    display: false,
                  },
                  title: {
                    display: true,
                    text: 'Weekly Borrowing Trend',
                    font: {
                      size: 16,
                      weight: 'bold',
                    },
                    padding: {
                      top: 10,
                      bottom: 30,
                    },
                  },
                },
                scales: {
                  x: {
                    grid: {
                      display: false,
                    },
                  },
                  y: {
                    beginAtZero: true,
                    ticks: {
                      precision: 0,
                    },
                  },
                },
              }}
              height={300}
            />
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-md overflow-hidden">
          <h2 className="text-2xl font-semibold text-gray-700 mb-4">Recent Transactions</h2>
          <div className="overflow-x-auto">
            <table className="w-full table-auto">
              <thead className="bg-orange-100 text-gray-700">
                <tr>
                  <th className="py-3 px-4 text-left">User</th>
                  <th className="py-3 px-4 text-left">Book</th>
                  <th className="py-3 px-4 text-left">Checkout Date</th>
                  <th className="py-3 px-4 text-left">Due Date</th>
                  <th className="py-3 px-4 text-left">Return Date</th>
                  <th className="py-3 px-4 text-left">Late Fees</th>
                  <th className="py-3 px-4 text-left">Actions</th>
                </tr>
              </thead>
              <tbody>
                {transactions.length > 0 ? (
                  transactions.map((transaction) => {
                    const isOverdue = transaction.dueDate && new Date(transaction.dueDate) < new Date();
                    return (
                      <tr key={transaction._id} className={`border-b border-gray-200 hover:bg-gray-50 ${isOverdue ? 'bg-red-50' : ''}`}>
                        <td className="py-3 px-4">{transaction.userId.name}</td>
                        <td className="py-3 px-4">{transaction.bookId.title}</td>
                        <td className="py-3 px-4">{new Date(transaction.checkoutDate).toLocaleDateString()}</td>
                        <td className="py-3 px-4">{transaction.dueDate ? new Date(transaction.dueDate).toLocaleDateString() : 'N/A'}</td>
                        <td className="py-3 px-4">{transaction.returnDate ? new Date(transaction.returnDate).toLocaleDateString() : 'N/A'}</td>
                        <td className="py-3 px-4">${transaction.lateFees.toFixed(2)}</td>
                        <td className="py-3 px-4">
                          <button
                            onClick={() => notifyUser(transaction.userId._id)}
                            className="px-3 py-1 rounded-full bg-orange-500 text-white hover:bg-orange-600 transition-colors duration-300 flex items-center"
                          >
                            <IoNotificationsOutline className="mr-1" /> Notify
                          </button>
                        </td>
                      </tr>
                    );
                  })
                ) : (
                  <tr>
                    <td colSpan="7" className="py-4 px-4 text-center text-gray-500">
                      No transactions found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LibStats;