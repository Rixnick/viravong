const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const {
  validateUsername,
  validateEmail,
  validatePassword,
} = require("../utils/isValidated");
const User = require("../models/Users");

const maxAge = 3 * 24 * 60 * 60;
const createToken = (id) => {
  return jwt.sign({ id }, process.env.APP_SECRET, {
    expiresIn: maxAge,
  });
};

module.exports.get_signin = async (req, res, next) => {
  try {
    res.render("Signin");
  } catch (error) {
    next(error);
  }
};

module.exports.post_signin = async (req, res, next) => {
  try {
    const { username, password } = req.body;

    //Check empty fill
    if (!username || !password) {
      res.status(400).json({ message: "Please fill all require fields...?" });
    }

    //Query user from database
    const user = await User.findOne({ username });
    if (!user) {
      res.status(400).json({
        message: "Not found this username, Please signup, try again...!",
      });
    }

    //Compare Password
    const isPassword = await bcrypt.compare(password, user.password);
    if (!isPassword) {
      res.status(400).json({ message: "Email or Passowrd incorrect...!" });
    }

    //Create Token
    const token = createToken(user._id);

    //Send Token to fronten
    res.cookie("jwt", token, { httpOnly: true, maxAge: maxAge * 1000 });

    res.redirect("/admin");
  } catch (error) {
    next(error);
  }
};

module.exports.get_signup = async (req, res, next) => {
  try {
    res.render("Signup");
  } catch (error) {
    next(error);
  }
};

module.exports.post_signup = async (req, res, next) => {
  try {
    const {
      username,
      firstname,
      lastname,
      contact,
      email,
      password,
      confirmpassword,
      terms,
    } = req.body;
    // console.log(req.body)

    //Check all fill requirement
    if (
      !username ||
      !firstname ||
      !lastname ||
      !contact ||
      !email ||
      !password ||
      !confirmpassword ||
      !terms
    ) {
      return status(400).json({ message: "Please fill all require field" });
    }

    //validate username
    const isValidUsername = validateUsername(username);
    if (!isValidUsername) {
      return status(400).json({
        message: "Please Enter Username between 3 to 20 characters...",
      });
    }

    //Validate an Email
    const isValidEmail = validateEmail(email);
    if (!isValidEmail) {
      return status(400).json({ message: "Please enter valid email..." });
    }

    //Validate Password
    const isValidPassword = validatePassword(password);
    if (!isValidPassword) {
      return status(400).json({
        message:
          "Please Enter password must be at leatst 6 to 60 characters...",
      });
    }

    //check matched password
    if (password !== confirmpassword) {
      return status(400).json({
        message: "password do not matched, try again?...",
      });
    }

    //Check exist username
    const isUsername = await User.findOne({ username });
    if (isUsername) {
      res.status(400).json({ error: "Username already in used..." });
    }

    //Check Existing Email
    const isEmail = await User.findOne({ email });
    if (isEmail) {
      res.status(400).json({ error: "Email already in used..." });
    }

    //hashing password and create user
    const hashedPassword = await bcrypt.hash(password, 12);

    //create New user
    const newUser = new User({
      username,
      firstname,
      lastname,
      contact,
      email,
      password: hashedPassword,
      terms,
    });

    await newUser.save();

    const token = createToken(newUser._id);

    res.cookie("jwt", token, { httpOnly: true, maxAge: maxAge * 1000 });

    res.redirect("/admin");
  } catch (error) {
    next(error);
  }
};


module.exports.get_signOut = async (req, res, next) => {
  try {
    res.cookie('jwt', '', {maxAge: 1});
    res.redirect('/auth/signin')
  } catch (error) {
    next(error)
  }
}