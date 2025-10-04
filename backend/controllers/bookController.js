import { Book } from "../models/Books.js";
import { Review } from "../models/Reviews.js";

export const addBook = async (req, res) => {
  try {
    const { title, author, description, genre, year } = req.body;
    const newBook = await Book.create({
      title, author, description, genre, year,
      addedBy: req.user.id
    });
    res.status(201).json(newBook);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const editBook = async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    if (!book) return res.status(404).json({ message: "Book not found" });
    if (book.addedBy.toString() !== req.user.id)
      return res.status(403).json({ message: "Not authorized" });

    const updatedBook = await Book.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updatedBook);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteBook = async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    if (!book) return res.status(404).json({ message: "Book not found" });
    if (book.addedBy.toString() !== req.user.id)
      return res.status(403).json({ message: "Not authorized" });

    await book.deleteOne();
    res.json({ message: "Book deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getBooks = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = 5;
    const skip = (page - 1) * limit;

    const totalBooks = await Book.countDocuments();
    const books = await Book.find().skip(skip).limit(limit).populate("addedBy", "name");

    res.json({
      books,
      totalPages: Math.ceil(totalBooks / limit),
      currentPage: page,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getBookDetails = async (req, res) => {
  try {
    const book = await Book.findById(req.params.id).populate("addedBy", "name");
    if (!book) return res.status(404).json({ message: "Book not found" });
    res.json(book);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getFeaturedBooks = async (req, res) => {
  try {
    const booksWithRatings = await Review.aggregate([
      {
        $group: {
          _id: "$book", 
          avgRating: { $avg: "$rating" },
          reviewCount: { $sum: 1 }
        }
      },
      {
        $match: { avgRating: { $gte: 4, $lte: 5 } }
      },
      {
        $lookup: {
          from: "books", 
          localField: "_id",
          foreignField: "_id",
          as: "bookInfo"
        }
      },
      {
        $unwind: "$bookInfo"
      },
      {
        $project: {
          _id: "$bookInfo._id",
          title: "$bookInfo.title",
          author: "$bookInfo.author",
          genre: "$bookInfo.genre",
          year: "$bookInfo.year",
          description: "$bookInfo.description",
          imageUrl: "$bookInfo.imageUrl",
          rating: { $round: ["$avgRating", 1] },
          reviewCount: 1
        }
      }
    ]);

    res.json(booksWithRatings);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};


export const getBooksbySearch = async (req, res) => {
  try {
    const { search, genre } = req.query;
    const query = {};

    if (search) {
      query.$or = [
        { title: { $regex: search, $options: "i" } },
        { author: { $regex: search, $options: "i" } }
      ];
    }

    if (genre) {
      query.genre = genre;
    }

    const books = await Book.find(query);
    res.status(200).json({ books, totalPages: 1, currentPage: 1 });
  } catch (error) {
    res.status(500).json({ message: "Error fetching books", error });
  }
};