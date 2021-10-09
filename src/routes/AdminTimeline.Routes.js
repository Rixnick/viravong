const express = require('express');
const {authenticated} = require('../middleware/auth');
const TimelineController = require('../controllers/AdminTimeline.Controller');

const router = express.Router()

router.get('/', authenticated, TimelineController.get_allTimeline);

router.get('/add', authenticated,  TimelineController.get_addTimeline);

router.post('/add', authenticated,  TimelineController.post_addTimeline);

router.get('/edit/:id', authenticated,  TimelineController.get_updateTimeline);

router.post('/edit/:id', authenticated,  TimelineController.post_updateTimeline);

router.get('/delete/:id', authenticated,  TimelineController.get_deleteTimeline);

module.exports = router;