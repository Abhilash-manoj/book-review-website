import React, { useEffect, useState } from "react";
import { getUserProfile } from "../api/api";

export default function Profile() {
  const [profile, setProfile] = useState({ books: [], reviews: [] });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      const token = localStorage.getItem("token");
      if (!token) return;

      try {
        const response = await getUserProfile(token);
        console.log("Profile data from API:", response);
        setProfile(response.data); 
      } catch (error) {
        console.error("Error fetching profile:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, []);

  if (loading)
    return (
      <div className="min-h-screen flex justify-center items-center text-white">
        Loading profile...
      </div>
    );

  return (
    <div className="min-h-screen bg-[#131022] text-gray-200 p-6">
      <h1 className="text-3xl font-bold mb-6">Your Profile</h1>

      {/* Books Section */}
      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Books You Added</h2>
        {profile.books?.length === 0 ? (
          <p>No books added yet.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {profile.books.map((book) => (
              <div key={book._id} className="bg-gray-800 p-4 rounded-lg">
                <h3 className="font-bold">{book.title}</h3>
                <p>{book.author}</p>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Reviews Section */}
      <section>
        <h2 className="text-2xl font-semibold mb-4">Your Reviews</h2>
        {profile.reviews?.length === 0 ? (
          <p>No reviews yet.</p>
        ) : (
          <div className="space-y-4">
            {profile.reviews.map((review) => (
              <div key={review._id} className="bg-gray-800 p-4 rounded-lg">
                <h3 className="font-bold">
                  {review.book?.title || "Deleted Book"}
                </h3>
                <p>Rating: {review.rating} ⭐</p>
                <p>{review.text}</p>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
