const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  author: {
    type: String,
    required: true
  },
  title: {
    type: String,
    required: true
  },
  desc: {
    type: String,
    required: true
  },  
  image: {
    type: String,
  },
  timeline: {
    type: String,
    required: true
  }
}, {
  timestamps: true
})

const Book = mongoose.model("Book", bookSchema);

module.exports = Book;