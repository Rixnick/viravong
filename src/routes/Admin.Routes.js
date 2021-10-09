const express = require('express');
const {authenticated} = require('../middleware/auth');
const AdminController = require('../controllers/Admin.Controller');


const router = express.Router();

router.get('/', authenticated,  AdminController.get_Admin);

router.get('/mail',  AdminController.get_allMail);

router.post('/mail',  AdminController.post_sendMail);

router.get('/mail/view/:id',  AdminController.get_readMail);

module.exports = router