import express from "express";
import { addBook, editBook, deleteBook, getBooks, getBookDetails, getFeaturedBooks, getBooksbySearch } from "../controllers/bookController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/addbook", protect, addBook);
router.put("/editbook/:id", protect, editBook);
router.delete("/deletebook/:id", protect, deleteBook);
router.get("/getbook", getBooks);
router.get("/getbookdetails/:id", getBookDetails);
router.get("/featured", getFeaturedBooks);
router.get("/", getBooksbySearch);

export default router;
