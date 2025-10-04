import express from "express";
import { addReview, getReviewsForBook, editReview, deleteReview } from "../controllers/reviewController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/:bookId", protect, addReview);
router.get("/:bookId", getReviewsForBook);
router.put("/:reviewId", protect, editReview);
router.delete("/:reviewId", protect, deleteReview);

export default router;
