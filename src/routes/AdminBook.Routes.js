const express = require('express');
const {authenticated} = require('../middleware/auth');
const BookController = require('../controllers/AdminBook.Controller');

const router = express.Router()

router.get('/', authenticated, BookController.get_allBooks);

router.get('/add', authenticated,  BookController.get_addBook);

router.post('/add', authenticated,  BookController.post_addBook);

router.get('/edit/:id', authenticated,  BookController.get_updateBook);

router.post('/edit/:id', authenticated,  BookController.post_updateBook);

router.get('/delete/:id', authenticated,  BookController.get_deleteBook);

module.exports = router;