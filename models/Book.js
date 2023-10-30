const mongoose = require("mongoose");

// Define the book schema
const bookSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "Please add title!"],
  },
  author: {
    type: String,
    required: [true, "Please add author name!"],
  },
  summary: {
    type: String,
    required: [true, "Please add summary!"],
  },
});

// Create a Book model from the schema
const Book = mongoose.model("Book", bookSchema);
module.exports = Book;
