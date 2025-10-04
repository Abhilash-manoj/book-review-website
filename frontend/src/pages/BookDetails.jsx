import React, { useEffect, useState } from "react";
import { getBookDetails, getReviewsForBook, addReview, editReview, deleteReview } from "../api/api";
import { useParams, Link } from "react-router-dom";
import Navbar from "../components/Navbar";

// --- SVG Icon Components ---
const LogoIcon = () => (
  <svg className="h-8 w-8 text-indigo-500" fill="none" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M36.7273 44C33.9891 44 31.6043 39.8386 30.3636 33.69C29.123 39.8386 26.7382 44 24 44C21.2618 44 18.877 39.8386 17.6364 33.69C16.3957 39.8386 14.0109 44 11.2727 44C7.25611 44 4 35.0457 4 24C4 12.9543 7.25611 4 11.2727 4C14.0109 4 16.3957 8.16144 17.6364 14.31C18.877 8.16144 21.2618 4 24 4C26.7382 4 29.123 8.16144 30.3636 14.31C31.6043 8.16144 33.9891 4 36.7273 4C40.7439 4 44 12.9543 44 24C44 35.0457 40.7439 44 36.7273 44Z"
      fill="currentColor"
    ></path>
  </svg>
);

const StarIcon = ({ filled = true }) => (
  <svg className={`h-5 w-5 ${filled ? "text-yellow-400" : "text-gray-600"}`} fill="currentColor" viewBox="0 0 20 20">
    <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z"></path>
  </svg>
);

export default function BookDetails() {
  const { id } = useParams();
  const [book, setBook] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [newReview, setNewReview] = useState({ rating: 0, text: "", reviewId: null });
  const [isLoading, setIsLoading] = useState(true);
  const token = localStorage.getItem("token");
  const isLoggedIn = !!token;
  const loggedInUserId = localStorage.getItem("userId");

  useEffect(() => {
    const fetchDetails = async () => {
      setIsLoading(true);
      try {
        const bookRes = await getBookDetails(id);
        setBook(bookRes.data);

        const reviewsRes = await getReviewsForBook(id);
        setReviews(reviewsRes.data);
      } catch (error) {
        console.error("Failed to fetch book details:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchDetails();
  }, [id]);

  const handleReviewChange = (e) => {
    setNewReview({ ...newReview, [e.target.name]: e.target.value });
  };

  const handleReviewSubmit = async (e) => {
    e.preventDefault();
    if (newReview.rating === 0 || !newReview.text) {
      alert("Please provide a rating and a review.");
      return;
    }
    try {
      const token = localStorage.getItem("token") || "fake-token";
      if (newReview.reviewId) {
        await editReview(newReview.reviewId, { rating: newReview.rating, text: newReview.text }, token);
      } else {
        await addReview(id, newReview, token);
      }
      const reviewsRes = await getReviewsForBook(id);
      setReviews(reviewsRes.data);
      setNewReview({ rating: 0, text: "", reviewId: null });
    } catch (error) {
      console.error("Failed to submit review:", error);
    }
  };

  const handleEditReview = (review) => {
    setNewReview({ rating: review.rating, text: review.text, reviewId: review._id });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleDeleteReview = async (reviewId) => {
    if (!window.confirm("Are you sure you want to delete this review?")) return;
    try {
      const token = localStorage.getItem("token");
      await deleteReview(reviewId, token);
      setReviews(reviews.filter((r) => r._id !== reviewId));
    } catch (error) {
      console.error("Failed to delete review:", error);
    }
  };

  const averageRating =
    reviews.length > 0
      ? (reviews.reduce((acc, review) => acc + review.rating, 0) / reviews.length).toFixed(1)
      : "N/A";

  if (isLoading)
    return (
      <div className="min-h-screen bg-[#131022] text-center text-gray-400 pt-20">
        Loading book details...
      </div>
    );
  if (!book)
    return (
      <div className="min-h-screen bg-[#131022] text-center text-red-400 pt-20">
        Book not found.
      </div>
    );

  return (
    <div className="min-h-screen bg-[#131022] font-sans text-gray-200 flex flex-col">
<Navbar />

      {/* Main Content */}
      <main className="flex-grow">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="max-w-4xl mx-auto">
            {/* Book Info Section */}
            <div className="bg-[#1e293b]/60 backdrop-blur-sm p-8 rounded-xl shadow-lg border border-white/10 mb-8">
              <h1 className="text-4xl font-extrabold mb-2 text-white">{book.title}</h1>
              <p className="text-lg text-gray-400 mb-4">by {book.author}</p>
              <div className="flex items-center gap-4 mb-4">
                <span className="bg-indigo-500/20 text-indigo-300 text-sm font-medium px-3 py-1 rounded-full">
                  {book.genre}
                </span>
                <span className="text-gray-400">Published: {book.year}</span>
              </div>
              <p className="text-gray-300 leading-relaxed mb-6">{book.description}</p>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <StarIcon />
                  <span className="text-xl font-bold text-white">{averageRating}</span>
                  <span className="text-gray-400">({reviews.length} reviews)</span>
                </div>
                {book.addedBy?._id === loggedInUserId && (
                  <Link to={`/editbook/${book._id}`} className="btn-edit">
                    Edit Book
                  </Link>
                )}
              </div>
            </div>

            {/* Reviews Section */}
            <div className="bg-[#1e293b]/60 backdrop-blur-sm p-8 rounded-xl shadow-lg border border-white/10">
              <h2 className="text-2xl font-bold mb-6 text-white">Reviews</h2>

              {/* Add/Edit Review Form */}
              { isLoggedIn && (
              <form onSubmit={handleReviewSubmit} className="mb-8 p-4 bg-gray-700/30 rounded-lg">
                <h3 className="text-lg font-semibold mb-2 text-white">
                  {newReview.reviewId ? "Edit Your Review" : "Add Your Review"}
                </h3>
                <div className="flex items-center mb-3">
                  {[...Array(5)].map((_, index) => (
                    <button
                      type="button"
                      key={index}
                      onClick={() => setNewReview({ ...newReview, rating: index + 1 })}
                    >
                      <StarIcon filled={index < newReview.rating} />
                    </button>
                  ))}
                </div>
                <textarea
                  name="text"
                  rows="3"
                  placeholder="Share your thoughts..."
                  value={newReview.text}
                  onChange={handleReviewChange}
                  className="w-full p-3 bg-gray-700/50 border border-gray-600 rounded-md placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-white"
                ></textarea>
                <button
                  type="submit"
                  className="mt-3 w-full rounded-md bg-indigo-600 px-4 py-2 text-sm font-semibold text-white shadow-md hover:bg-indigo-500"
                >
                  {newReview.reviewId ? "Update Review" : "Submit Review"}
                </button>
              </form>
                )}

              {/* Existing Reviews */}
              <div className="space-y-6">
                {reviews.map((review) => (
                  <div key={review._id} className="p-4 border-b border-gray-700">
                    <div className="flex items-center mb-1">
                      {[...Array(5)].map((_, index) => (
                        <StarIcon key={index} filled={index < review.rating} />
                      ))}
                    </div>
                    <p className="text-gray-300 mb-2">{review.text}</p>
                    <p className="text-sm text-gray-500 font-medium">- {review.user.name}</p>

                    {/* Edit/Delete buttons */}
                    {review.user._id === loggedInUserId && (
                      <div className="flex gap-2 mt-2">
                        <button
                          onClick={() => handleEditReview(review)}
                          className="px-2 py-1 text-sm bg-indigo-600 text-white rounded"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDeleteReview(review._id)}
                          className="px-2 py-1 text-sm bg-red-600 text-white rounded"
                        >
                          Delete
                        </button>
                      </div>
                    )}
                  </div>
                ))}
                {reviews.length === 0 && <p className="text-gray-400">No reviews yet. Be the first!</p>}
              </div>
            </div>
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
            <p className="text-sm text-gray-500">© 2025 BookVerse. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
