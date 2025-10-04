import React from "react";
import { Link, useNavigate } from "react-router-dom";

// --- SVG Logo Icon ---
const LogoIcon = () => (
  <svg className="h-8 w-8 text-indigo-500" fill="none" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M36.7273 44C33.9891 44 31.6043 39.8386 30.3636 33.69C29.123 39.8386 26.7382 44 24 44C21.2618 44 18.877 39.8386 17.6364 33.69C16.3957 39.8386 14.0109 44 11.2727 44C7.25611 44 4 35.0457 4 24C4 12.9543 7.25611 4 11.2727 4C14.0109 4 16.3957 8.16144 17.6364 14.31C18.877 8.16144 21.2618 4 24 4C26.7382 4 29.123 8.16144 30.3636 14.31C31.6043 8.16144 33.9891 4 36.7273 4C40.7439 4 44 12.9543 44 24C44 35.0457 40.7439 44 36.7273 44Z"
      fill="currentColor"
    ></path>
  </svg>
);

export default function Navbar() {
  const navigate = useNavigate();
  const isLoggedIn = !!localStorage.getItem("token");

  return (
    <header className="sticky top-0 z-50 bg-[#131022]/80 backdrop-blur-sm">
      <div className="container mx-auto flex items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-3">
          <LogoIcon />
          <h2 className="text-xl font-bold text-white">BookVerse</h2>
        </Link>

        {/* Navigation Links */}
        <div className="flex items-center gap-4">
          {isLoggedIn ? (
            <div
              className="h-9 w-9 rounded-full bg-cover bg-center border-2 border-indigo-500 cursor-pointer"
              style={{ backgroundImage: `url('https://placehold.co/100x100/1e293b/ffffff?text=Profile')` }}
              onClick={() => navigate("/profile")}
              title="View Profile"
            ></div>
          ) : (
            <div className="flex items-center gap-2">
              <Link to="/signin" className="text-sm font-medium mx-5 text-gray-300 hover:text-indigo-400">
                Sign In
              </Link>
              <Link
                to="/signup"
                className="rounded-md bg-indigo-600 px-4 py-2 text-sm font-semibold text-white shadow-lg hover:bg-indigo-500"
              >
                Sign Up
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
