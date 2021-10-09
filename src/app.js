const express = require("express");
const app = express();
const cors = require('cors');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const path = require('path');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const fileUpload = require('express-fileupload');


//const config = require('./config/database');
// const { checkToken } = require('./auth/token_validation');


/*
 **** SET MIDDLEWARE
 */
app.use(morgan('dev'));
app.use(cors());
app.use(cookieParser());
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, '../', 'public')));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(fileUpload({
  useTempFiles: true,
  tempFileDir: path.join(__dirname, '../', 'temp'),
  createParentPath: true,
  limits: {
    fileSize: 5 * 1024 * 1024
  }
}));

/*
 **** Middle ware Authorization  here
 */
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Header', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    if(req.method === 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
        return res.status(200).json({});
    }
    next();
});

mongoose.connect(process.env.DB_URI, {
    // useNewUrlParser: true,
    // useUndifiedTopology: true
})

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'Connection Error:'));
db.once('open', function(){
    console.log('Connected to mongo db...!')
})

const homeRoutes = require('./routes/Home.Routes');

const authRoutes = require('./routes/Auth.Routes');
const adminRoutes = require('./routes/Admin.Routes');
const bookRoutes = require('./routes/AdminBook.Routes');
const storyRoutes = require('./routes/AdminStory.Routes');
const timelineRoutes = require('./routes/AdminTimeline.Routes');

app.use('/', homeRoutes);

app.use('/auth', authRoutes)
app.use('/admin', adminRoutes);
app.use('/books', bookRoutes);
app.use('/stories', storyRoutes);
app.use('/timelines', timelineRoutes);


/*
 **** Use error handling Routes
 */
app.use((req, res, next) => {
    const error = new Error('Not Found');
    error.status = 404;
    next(error);
});
app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
        error: {
            message: error.message
        }
    })
});

module.exports = app;