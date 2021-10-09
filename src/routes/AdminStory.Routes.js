const express = require('express');
const {authenticated} = require('../middleware/auth');
const StoryController = require('../controllers/AdminStory.Controller');

const router = express.Router()

router.get('/', authenticated, StoryController.get_allStory);

router.get('/add', authenticated,  StoryController.get_addStory);

router.post('/add', authenticated,  StoryController.post_addStory);

router.get('/edit/:id', authenticated,  StoryController.get_updateStory);

router.post('/edit/:id', authenticated,  StoryController.post_updateStory);

router.get('/delete/:id', authenticated,  StoryController.get_deleteStory);

module.exports = router;