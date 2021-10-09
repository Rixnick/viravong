const express = require('express');
const HomeController = require('../controllers/Home.Controller');


const router = express.Router()

router.get('/', HomeController.get_Home);


router.get('/story/:id', HomeController.get_storyById);


router.get('/book/:id', HomeController.get_bookById);

module.exports = router