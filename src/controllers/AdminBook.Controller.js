const mkdirp = require("mkdirp");
const Book = require('../models/Book');

module.exports.get_allBooks = async (req, res, next) => {
  try {
    const books = await Book.find({}).sort({ createdAt: -1 })
    res.render('admin/books/Book', {
      books: books
    })
  } catch (error) {
    next(error)
  }
}


module.exports.get_addBook = async (req, res, next) => {
  try {
    res.render('admin/books/Add')
  } catch (error) {
    next(error)
  }
}

module.exports.post_addBook = async (req, res, next) => {
  try {
    const imageFile = typeof req.files.bookImage !== 'undefined' ? req.files.bookImage.name : "";
    const {name, author, title, desc, timeline } = req.body;
    console.log(req.body)

    const book = new Book({
      name: name,
      author: author,
      title: title,
      desc: desc,
      image: imageFile,
      timeline: timeline
    });

    await book.save(function(error){
      if(error)
      return console.log(error);

      mkdirp.sync('./public/uploads/books/' + book._id);

      if(imageFile != ""){
        const bookImage = req.files.bookImage;
        const path = './public/uploads/books/' + book._id + '/' + imageFile;

        bookImage.mv(path, function(error){
          return console.log(error)
        });
      }
    });

    res.redirect('/books');
  } catch (error) {
    next(error)
  }
}

module.exports.get_updateBook = async (req, res, next) => {
  try {
    const {id} = req.params;

    const book = await Book.findById(id);

    console.log("book ID:", book)

    res.render('admin/books/Update', {
      name: book.name,
      author: book.author,
      title: book.title,
      desc: book.desc,
      timeline: book.timeline,
      image: book.image,
      id: book._id
    });
  } catch (error) {
    next(error)
  }
}

module.exports.post_updateBook = async (req, res, next) => {
  try {
    const {id} = req.params;

    await Book.update({_id: id}, req.body);

    res.redirect('/books')
  } catch (error) {
    next(error)
  }
}

module.exports.get_deleteBook = async (req, res, next) => {
  try {
    const {id} = req.params;

    await Book.findByIdAndRemove(id);

    res.redirect('/books')
  } catch (error) {
    next(error)
  }
}