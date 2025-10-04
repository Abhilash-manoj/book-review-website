import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getFeaturedBooks } from "../api/api";
import Navbar from "../components/Navbar";

// --- SVG Icon Components ---
const LogoIcon = () => (
  <svg className="h-8 w-8 text-indigo-500" fill="none" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
    <path d="M36.7273 44C33.9891 44 31.6043 39.8386 30.3636 33.69C29.123 39.8386 26.7382 44 24 44C21.2618 44 18.877 39.8386 17.6364 33.69C16.3957 39.8386 14.0109 44 11.2727 44C7.25611 44 4 35.0457 4 24C4 12.9543 7.25611 4 11.2727 4C14.0109 4 16.3957 8.16144 17.6364 14.31C18.877 8.16144 21.2618 4 24 4C26.7382 4 29.123 8.16144 30.3636 14.31C31.6043 8.16144 33.9891 4 36.7273 4C40.7439 4 44 12.9543 44 24C44 35.0457 40.7439 44 36.7273 44Z" fill="currentColor"></path>
  </svg>
);

const StarIcon = () => (
  <svg className="h-4 w-4 text-indigo-400" fill="currentColor" viewBox="0 0 20 20">
    <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z"></path>
  </svg>
);

// --- Reusable Book Card Component ---
const BookCard = ({ book }) => (
  <div className="flex-shrink-0 bg-[#362a74] rounded-xl w-48 space-y-3">
    <div className="aspect-[3/4] w-full overflow-hidden rounded-lg shadow-lg">
      <img alt={`${book.title}`} className="h-full w-full object-cover" src={book.imageUrl} />
    </div>
    <div className="p-10">
      <h3 className="font-bold text-white truncate">{book.title}</h3>
      <p className="text-sm text-gray-400">{book.author}</p>
      <div className="mt-1 flex items-center gap-1 text-sm text-gray-400">
        {book.rating}
        <StarIcon />
      </div>
    </div>
  </div>
);

export default function Home() {
  const navigate = useNavigate();
  const [featuredBooks, setFeaturedBooks] = useState([]);
  const isLoggedIn = !!localStorage.getItem("token");

  
  useEffect(() => {
    const fetchFeaturedBooks = async () => {
      try {
        const res = await getFeaturedBooks();
        setFeaturedBooks(res.data);
      } catch (err) {
        console.error("Failed to fetch featured books:", err);
      }
    };
    fetchFeaturedBooks();
  }, []);

  const handleAddBook = () => {
    if (!isLoggedIn) {
      alert("Please sign in to add a book!");
      navigate("/signin");
    } else {
      navigate("/addbook");
    }
  };

  return (
    <div className="min-h-screen bg-[#131022] font-sans text-gray-200">
      <Navbar />

      {/* Hero Section */}
      <main className="flex-grow">
        <section
          className="relative bg-cover bg-center bg-no-repeat py-24 sm:py-32 md:py-40"
          style={{
            backgroundImage:
              'linear-gradient(rgba(19, 16, 34, 0.7), rgba(19, 16, 34, 1)), url("https://images.unsplash.com/photo-1521587760476-6c12a4b040da?auto=format&fit=crop&w=1950&q=80")',
          }}
        >
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl md:text-6xl">
              Discover Your Next Favorite Book
            </h1>
            <p className="mt-4 max-w-2xl mx-auto text-lg text-gray-300">Read, Review, Connect.</p>
            <div className="mt-8">
              <button
                onClick={() => navigate("/booklist")}
                className="inline-block rounded-lg m-5 bg-indigo-600 px-8 py-3 text-base font-semibold text-white shadow-lg hover:bg-indigo-500"
              >
                Browse Books
              </button>
              <button
                onClick={handleAddBook}
                className="inline-block rounded-lg m-5 bg-indigo-600 px-8 py-3 text-base font-semibold text-white shadow-lg hover:bg-indigo-500"
              >
                + Add Books
              </button>
            </div>
          </div>
        </section>

        {/* Featured Books */}
        <section className="py-16 sm:py-20">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">Featured Books</h2>
            <div className="mt-8 overflow-x-auto pb-6">
              <div className="flex gap-6">
                {featuredBooks.length > 0 ? (
                  featuredBooks.map((book) => <BookCard key={book._id} book={book} />)
                ) : (
                  <p className="text-gray-400">No featured books found.</p>
                )}
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-[#131022] border-t border-white/10">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col items-center gap-6">
            <div className="flex items-center gap-3">
              <LogoIcon />
              <h2 className="text-xl font-bold text-white">BookVerse</h2>
            </div>
            <div className="flex flex-wrap justify-center gap-x-6 gap-y-2">
              <a href="/about" className="text-sm text-gray-400 hover:text-indigo-400">About</a>
              <a href="/contact" className="text-sm text-gray-400 hover:text-indigo-400">Contact</a>
              <a href="/privacy" className="text-sm text-gray-400 hover:text-indigo-400">Privacy Policy</a>
            </div>
            <p className="text-sm text-gray-500">© 2025 BookVerse. All rights reserved.</p>
            <p className="text-xs text-gray-600">Assignment powered by Logiksutra AI</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
