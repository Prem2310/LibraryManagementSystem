import React from "react";

export default function BookForm() {
  return (
    <div className="w-[100vw] overflow-y-hidden bg-gradient-to-br from-orange-100 to-orange-200 min-h-screen pl-8 pr-8 pt-3 pb-2">
      <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-xl  pl-8 pr-8 pt-2 pb-2">
        <h1 className="text-4xl font-bold text-orange-600 mt-4 mb-2">
          Add New Book
        </h1>
        <form>
          <div className="space-y-2">
            <InputField placeholder="Book Title" />
            <InputField placeholder="Author Name" />
            <TextArea placeholder="Book Description" />
            <InputField placeholder="Image Link" />
            <div className="flex space-x-4">
              <InputField
                placeholder="Number of Copies"
                type="number"
                className="w-1/2"
              />
              <SelectField className="w-1/2" />
            </div>
            <button
              type="submit"
              className="w-full bg-orange-500 text-white py-3 rounded-lg text-lg font-semibold hover:bg-orange-600 transition duration-300">
              Add Book
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

const InputField = ({ placeholder, type = "text", className = "" }) => (
  <input
    placeholder={placeholder}
    type={type}
    className={`w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-orange-500 focus:ring focus:ring-orange-200 focus:ring-opacity-50 ${className}`}
  />
);

const TextArea = ({ placeholder }) => (
  <textarea
    placeholder={placeholder}
    rows="4"
    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-orange-500 focus:ring focus:ring-orange-200 focus:ring-opacity-50"></textarea>
);

const SelectField = ({ className = "" }) => (
  <select
    className={`w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-orange-500 focus:ring focus:ring-orange-200 focus:ring-opacity-50 ${className}`}>
    <option value="" disabled selected>
      Select Genre
    </option>
    <option value="fiction">Fiction</option>
    <option value="non-fiction">Non-Fiction</option>
    <option value="fantasy">Fantasy</option>
    <option value="mystery">Mystery</option>
    <option value="sci-fi">Science Fiction</option>
    <option value="biography">Biography</option>
    <option value="romance">Romance</option>
    <option value="history">History</option>
    <option value="self-help">Self-Help</option>
  </select>
);
