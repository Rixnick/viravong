const jwt = require('jsonwebtoken');
const User = require('../models/Users');


const authenticated = (req, res, next) => {
  const token = req.cookies.jwt;

  if(token) {
    jwt.verify(token, process.env.APP_SECRET, async (error, decodedToken) => {
      if(error) {
        // res.status(401)
        console.log(error.message)
        res.redirect('/auth/signin')
      } else {
        let user = await User.findById(decodedToken.id);
        // console.log("currently user:", user)
        res.locals.user = user;
        next();
      }
    })
  }else {
    res.redirect('/auth/signin');
  }
}

module.exports = {
  authenticated
}