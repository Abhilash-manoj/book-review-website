import React, { useState, useEffect } from "react";
import { editBook, getBookDetails, deleteBook } from "../api/api";
import { useNavigate, useParams, Link } from "react-router-dom";
import Navbar from "../components/Navbar";


const LogoIcon = () => (
  <svg className="h-8 w-8 text-indigo-500" fill="none" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M36.7273 44C33.9891 44 31.6043 39.8386 30.3636 33.69C29.123 39.8386 26.7382 44 24 44C21.2618 44 18.877 39.8386 17.6364 33.69C16.3957 39.8386 14.0109 44 11.2727 44C7.25611 44 4 35.0457 4 24C4 12.9543 7.25611 4 11.2727 4C14.0109 4 16.3957 8.16144 17.6364 14.31C18.877 8.16144 21.2618 4 24 4C26.7382 4 29.123 8.16144 30.3636 14.31C31.6043 8.16144 33.9891 4 36.7273 4C40.7439 4 44 12.9543 44 24C44 35.0457 40.7439 44 36.7273 44Z"
      fill="currentColor"
    ></path>
  </svg>
);

export default function EditBook() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: "",
    author: "",
    description: "",
    genre: "",
    year: "",
  });
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const token = localStorage.getItem("token");
  const isLoggedIn = !!token;

  useEffect(() => {
    const fetchBook = async () => {
      setIsLoading(true);
      try {
        const res = await getBookDetails(id);
        setFormData(res.data);
      } catch (err) {
        setError("Could not fetch book details.");
      } finally {
        setIsLoading(false);
      }
    };
    fetchBook();
  }, [id]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");
    try {
      const token = localStorage.getItem("token") || "fake-token";
      await editBook(id, formData, token);
      alert("Book updated successfully!");
      navigate(`/bookdetails/${id}`);
    } catch (err) {
      setError(err.response?.data?.message || "Error editing book");
    } finally {
      setIsLoading(false);
    }
  };

  // ✅ Delete book handler
  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete this book?")) return;

    try {
      const token = localStorage.getItem("token");
      await deleteBook(id, token);
      alert("Book deleted successfully!");
      navigate("/booklist");
    } catch (err) {
      setError(err.response?.data?.message || "Error deleting book");
    }
  };

  return (
    <div className="min-h-screen bg-[#131022] font-sans text-gray-200 flex flex-col">
  <Navbar />

      {/* Main Content */}
      <main className="flex-grow flex items-center justify-center p-4">
        <div className="w-full max-w-lg">
          <div className="bg-[#1e293b]/60 backdrop-blur-sm p-8 rounded-xl shadow-2xl border border-white/10">
            <h2 className="text-3xl font-bold text-center text-white mb-2">Edit Book</h2>
            <p className="text-center text-gray-400 mb-6">
              Update the details for "{formData.title}"
            </p>

            <form className="space-y-4" onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label
                    className="text-sm font-medium text-gray-300 block mb-2"
                    htmlFor="title"
                  >
                    Book Title
                  </label>
                  <input
                    id="title"
                    className="w-full p-3 bg-gray-700/50 border border-gray-600 rounded-md placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-white"
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div>
                  <label
                    className="text-sm font-medium text-gray-300 block mb-2"
                    htmlFor="author"
                  >
                    Author
                  </label>
                  <input
                    id="author"
                    className="w-full p-3 bg-gray-700/50 border border-gray-600 rounded-md placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-white"
                    type="text"
                    name="author"
                    value={formData.author}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <div>
                <label
                  className="text-sm font-medium text-gray-300 block mb-2"
                  htmlFor="description"
                >
                  Description
                </label>
                <textarea
                  id="description"
                  rows="4"
                  className="w-full p-3 bg-gray-700/50 border border-gray-600 rounded-md placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-white"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label
                    className="text-sm font-medium text-gray-300 block mb-2"
                    htmlFor="genre"
                  >
                    Genre
                  </label>
                  <input
                    id="genre"
                    className="w-full p-3 bg-gray-700/50 border border-gray-600 rounded-md placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-white"
                    type="text"
                    name="genre"
                    value={formData.genre}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div>
                  <label
                    className="text-sm font-medium text-gray-300 block mb-2"
                    htmlFor="year"
                  >
                    Published Year
                  </label>
                  <input
                    id="year"
                    className="w-full p-3 bg-gray-700/50 border border-gray-600 rounded-md placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-white"
                    type="number"
                    name="year"
                    value={formData.year}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              {/* ✅ Buttons */}
              <div className="flex justify-between mt-6">
                <button
                  className="px-6 py-3 bg-indigo-600 text-white rounded-md font-bold hover:bg-indigo-700 transition duration-300 disabled:bg-indigo-800 disabled:cursor-not-allowed"
                  type="submit"
                  disabled={isLoading}
                >
                  {isLoading ? "Updating..." : "Update Book"}
                </button>

                <button
                  type="button"
                  onClick={handleDelete}
                  className="px-6 py-3 bg-red-600 text-white rounded-md font-bold hover:bg-red-700 transition duration-300"
                >
                  Delete Book
                </button>
              </div>
            </form>

            {error && <p className="text-red-400 text-center mt-4">{error}</p>}
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-[#131022] border-t border-white/10">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col items-center gap-6">
            <div className="flex items-center gap-3">
              <LogoIcon />
              <h2 className="text-xl font-bold text-white">BookVerse</h2>
            </div>
            <p className="text-sm text-gray-500">
              © 2025 BookVerse. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
