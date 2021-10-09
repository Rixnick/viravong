const Book = require('../models/Book');
const Story = require('../models/Story');
const Timeline = require('../models/Timeline');

module.exports.get_Home = async  (req, res, next) => {
  try {
    const books = await Book.find({}).sort({ createdAt: -1 });

    const stories = await Story.find({}).sort({ createdAt: -1 });
    // console.log("stories: ", stories)

    const times = await Timeline.find({}).sort({ createdAt: -1 });

    res.render('index', {
      books: books,
      stories: stories,
      times: times
    })
  } catch (error) {
    next(error)
  }
}

module.exports.get_storyById = async (req, res, next) => {
  try {
    const {id} = req.params;

    const story = await Story.findById(id);

    res.render('Story', {
      title: story.title,
      author: story.author,
      desc: story.desc,
      image: story.image,
      timeline: story.timeline,
      id: story._id
    })
  } catch (error) {
    next(error)
  }
}

module.exports.get_bookById = async (req, res, next) => {
  try {
    const {id} = req.params;

    const book = await Book.findById(id);

    res.render('Book', {
      name: book.name,
      title: book.title,
      author: book.author,
      desc: book.desc,
      image: book.image,
      timeline: book.timeline,
      id: book._id
    })
  } catch (error) {
    next(error)
  }
}