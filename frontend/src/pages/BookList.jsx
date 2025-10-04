import React, { useEffect, useState } from "react";
import { getBooks } from "../api/api";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";

// --- SVG Icon Components ---
const LogoIcon = () => (
  <svg className="h-8 w-8 text-indigo-500" fill="none" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
    <path d="M36.7273 44C33.9891 44 31.6043 39.8386 30.3636 33.69C29.123 39.8386 26.7382 44 24 44C21.2618 44 18.877 39.8386 17.6364 33.69C16.3957 39.8386 14.0109 44 11.2727 44C7.25611 44 4 35.0457 4 24C4 12.9543 7.25611 4 11.2727 4C14.0109 4 16.3957 8.16144 17.6364 14.31C18.877 8.16144 21.2618 4 24 4C26.7382 4 29.123 8.16144 30.3636 14.31C31.6043 8.16144 33.9891 4 36.7273 4C40.7439 4 44 12.9543 44 24C44 35.0457 40.7439 44 36.7273 44Z" fill="currentColor"></path>
  </svg>
);

export default function BookList() {
  const [books, setBooks] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const token = localStorage.getItem("token");
  const isLoggedIn = !!token; 

  useEffect(() => {
    const fetchBooks = async () => {
      setIsLoading(true);
      try {
        const res = await getBooks(page);
        setBooks(res.data.books);
        setTotalPages(res.data.totalPages);
      } catch (error) {
        console.error("Failed to fetch books:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchBooks();
  }, [page]);

  return (
    <div className="min-h-screen bg-[#131022] font-sans text-gray-200 flex flex-col">
    <Navbar />
      
      {/* Main Content */}
      <main className="flex-grow">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl">Browse the Collection</h1>
            <p className="mt-4 max-w-2xl mx-auto text-lg text-gray-400">Find your next read from our curated list of books.</p>
          </div>
          
          {isLoading ? (
             <div className="text-center text-gray-400">Loading books...</div>
          ) : (
            <>
              <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                {books.map((book) => (
                  <div key={book._id} className="bg-[#1e293b]/60 backdrop-blur-sm p-6 rounded-xl shadow-lg border border-white/10 flex flex-col">
                    <div className="flex-grow">
                        <h3 className="text-xl font-bold mb-2 text-white">{book.title}</h3>
                        <p className="mb-1 text-gray-400"><span className="font-medium text-gray-300">Author:</span> {book.author}</p>
                        <p className="mb-4 text-gray-400"><span className="font-medium text-gray-300">Genre:</span> {book.genre}</p>
                    </div>
                    <Link to={`/bookdetails/${book._id}`} className="mt-4 text-center w-full inline-block rounded-md bg-indigo-600 px-4 py-2 text-sm font-semibold text-white shadow-md hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:ring-offset-2 focus:ring-offset-gray-900">
                        View Details
                    </Link>
                  </div>
                ))}
              </div>

              <div className="flex justify-center items-center gap-4 mt-12">
                <button 
                    disabled={page <= 1} 
                    onClick={() => setPage(page - 1)} 
                    className="px-4 py-2 bg-indigo-600 text-white rounded-md font-bold hover:bg-indigo-700 transition duration-300 disabled:bg-gray-700 disabled:cursor-not-allowed disabled:opacity-50"
                >
                    Previous
                </button>
                <span className="px-4 py-2 text-lg font-semibold text-white bg-gray-700/50 rounded-md">{page} of {totalPages}</span>
                <button 
                    disabled={page >= totalPages} 
                    onClick={() => setPage(page + 1)} 
                    className="px-4 py-2 bg-indigo-600 text-white rounded-md font-bold hover:bg-indigo-700 transition duration-300 disabled:bg-gray-700 disabled:cursor-not-allowed disabled:opacity-50"
                >
                    Next
                </button>
              </div>
            </>
          )}
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
            <p className="text-sm text-gray-500">© 2025 BookVerse. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
