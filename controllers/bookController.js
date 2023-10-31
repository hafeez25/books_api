const Book = require("../models/Book");

// 1- Create book in DB
const createBook = async (req, res) => {
  try {
    const { title, author, summary } = req.body;

    // Check if any of the required fields are missing
    if (!title || !author || !summary) {
      res.status(400);
      return res.json({
        message:
          "All required fields (title, author, and summary) must be provided.",
      });
    }

    const response = await Book.create({
      title,
      author,
      summary,
    });
    res.status(201);
    return res.json(response);
  } catch (err) {
    res.status(500);
    return res.json({ message: "Something bad happened!" });
  }
};

// 2- Get All Books
const getAllBooks = async (req, res) => {
  try {
    const response = await Book.find().sort({ _id: -1 });
    res.status(200);
    return res.json(response);
  } catch (err) {
    res.status(500);
    return res.json({ message: "Something bad happened!" });
  }
};

// 3- Get Single Book
const getBookById = async (req, res) => {
  try {
    console.log(req.params.id);
    const book = await Book.findById(req.params.id);

    if (!book) {
      res.status(404);
      return res.json({ message: "Book not found!" });
    }

    res.status(200);
    return res.json(book);
  } catch (err) {
    res.status(500);
    return res.json({ message: "Something bad happened!" });
  }
};

// 4- Update Book Details
const updateBook = async (req, res) => {
  try {
    const updatedBook = await Book.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });

    if (!updatedBook) {
      res.status(404);
      return res.json({ message: "Book not found!" });
    }

    res.status(200);
    return res.json(updatedBook);
  } catch (err) {
    res.status(500);
    return res.json({ message: "Something bad happened!" });
  }
};

// 5- Delete Book from DB
const deleteBook = async (req, res) => {
  try {
    const book = await Book.findByIdAndDelete(req.params.id);
    if (!book) {
      res.status(404);
      return res.json("Book not found!");
    }
    res.status(200);
    return res.json({ message: "Book deleted!" });
  } catch (err) {
    res.status(500);
    return res.json({ message: "Something bad happened!" });
  }
};

module.exports = {
  createBook,
  getAllBooks,
  getBookById,
  updateBook,
  deleteBook,
};
