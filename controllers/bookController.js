const Book = require("../models/Book");
const cloudinary = require("cloudinary").v2;

// 1- Create book in DB
const createBook = async (req, res) => {
  try {
    const { title, author, summary } = req.body;

    if (!title || !author || !summary) {
      res.status(400);
      return res.json({
        message:
          "All required fields (title, author, summary, and image) must be provided.",
      });
    }

    // Handle Image upload
    let uploadedFile;
    if (req.file) {
      // Save image to cloudinary
      try {
        uploadedFile = await cloudinary.uploader.upload(req.file.path, {
          folder: "book_covers",
          resource_type: "image",
        });
      } catch (error) {
        res.status(500);
        throw new Error("Image could not be uploaded");
      }
    }

    const newBook = new Book({
      title,
      author,
      summary,
      imageURL: uploadedFile.secure_url,
    });

    const response = await newBook.save();
    res.status(201);
    return res.json(response);
  } catch (err) {
    console.error(err);
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
    const { title, author, summary, imageURL } = req.body;
    const bookId = req.params.id;

    // Find the existing book
    const existingBook = await Book.findById(bookId);

    if (!existingBook) {
      res.status(404);
      return res.json({ message: "Book not found!" });
    }

    // Handle Image update
    let updatedImageURL = existingBook.imageURL;
    if (req.file) {
      // Delete the previous image from Cloudinary
      try {
        await cloudinary.uploader.destroy(existingBook.imageURL);
      } catch (error) {
        console.error("Previous image could not be deleted");
      }

      // Upload the new image to Cloudinary
      try {
        const uploadedFile = await cloudinary.uploader.upload(req.file.path, {
          folder: "book_covers",
          resource_type: "image",
        });
        updatedImageURL = uploadedFile.secure_url;
      } catch (error) {
        res.status(500);
        throw new Error("Image could not be uploaded");
      }
    }

    // Update book details
    const updatedBook = {
      title: title || existingBook.title,
      author: author || existingBook.author,
      summary: summary || existingBook.summary,
      imageURL: updatedImageURL,
    };

    const updatedBookRecord = await Book.findByIdAndUpdate(
      bookId,
      updatedBook,
      { new: true }
    );

    res.status(200);
    return res.json(updatedBookRecord);
  } catch (err) {
    console.error(err);
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
