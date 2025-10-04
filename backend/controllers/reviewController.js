import { Review } from "../models/Reviews.js";

export const addReview = async (req, res) => {
  try {
    const { rating, text } = req.body;

    const review = new Review({
      user: req.user._id,
      book: req.params.bookId,
      rating,
      text,
    });

    await review.save();

    res.status(201).json(review);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};

export const getReviewsForBook = async (req, res) => {
  try {
    const reviews = await Review.find({ book: req.params.bookId }).populate("user", "name");
    res.json(reviews);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};

export const getFeaturedBooks = async (req, res) => {
const minRating = parseFloat(req.query.minRating) || 0;
const maxRating = parseFloat(req.query.maxRating) || 5;

  try {
    const books = await Book.find({
      rating: { $gte: minRating, $lte: maxRating }
    });
    res.json(books);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Edit review
export const editReview = async (req, res) => {
  try {
    const { reviewId } = req.params;
    const { rating, text } = req.body;

    const review = await Review.findById(reviewId);

    if (!review) return res.status(404).json({ message: "Review not found" });

    // Check ownership
    if (review.user.toString() !== req.user.id) {
      return res.status(403).json({ message: "Unauthorized" });
    }

    review.rating = rating || review.rating;
    review.text = text || review.text;
    await review.save();

    res.json({ message: "Review updated", review });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

// Delete review
export const deleteReview = async (req, res) => {
  try {
    const { reviewId } = req.params;

    const review = await Review.findById(reviewId);

    if (!review) return res.status(404).json({ message: "Review not found" });

    if (review.user.toString() !== req.user.id) {
      return res.status(403).json({ message: "Unauthorized" });
    }

    await review.deleteOne();

    res.json({ message: "Review deleted" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};
