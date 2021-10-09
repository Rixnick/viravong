const express = require('express');
const router = express.Router();
const AuthController = require('../controllers/Auth.Controller');
const {authenticated} = require('../middleware/auth');

router.get('/signin', AuthController.get_signin);


router.post('/signin', AuthController.post_signin);

router.get('/signup', authenticated,  AuthController.get_signup);


router.post('/signup', authenticated, AuthController.post_signup);


router.get('/logout', AuthController.get_signOut);

module.exports = router