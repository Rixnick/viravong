const mkdirp = require("mkdirp");
const Story = require('../models/Story');

module.exports.get_allStory = async (req, res, next) => {
  try {
    const stories = await Story.find({}).sort({ createdAt: -1 });
    res.render('admin/stories/Stories', {
      stories: stories
    })
  } catch (error) {
    next(error)
  }
}


module.exports.get_addStory = async (req, res, next) => {
  try {
    res.render('admin/stories/Add')
  } catch (error) {
    next(error)
  }
}

module.exports.post_addStory = async (req, res, next) => {
  try {
    const imageFile = typeof req.files.toppicImage !== 'undefined' ? req.files.toppicImage.name : "";
    const { title, author, desc, timeline } = req.body;

    const story = new Story({
      title: title,
      author: author,
      desc: desc,
      image: imageFile,
      timeline: timeline
    });

    await story.save(function(error){
      if(error)
        return console.log(error);

      mkdirp.sync('./public/uploads/stories/' + story._id);

      if(imageFile != ""){
        const toppicImage = req.files.toppicImage;
        const path = './public/uploads/stories/' + story._id + '/' + imageFile;

        toppicImage.mv(path, function(error){
          return console.log(error)
        })
      }
    });

    res.redirect('/stories');
  } catch (error) {
    next(error)
  }
}

module.exports.get_updateStory = async (req, res, next) => {
  try {
    const {id} = req.params;

    const story = await Story.findById(id);

    res.render('admin/stories/Update', {
      title: story.title,
      author: story.author,
      desc: story.desc,
      image: story.image,
      timeline: story.timeline,
      id: story._id
    });
  } catch (error) {
    next(error)
  }
}

module.exports.post_updateStory = async (req, res, next) => {
  try {
    const {id} = req.params;

    await Story.update({_id: id}, req.body);

    res.redirect('/stories')
  } catch (error) {
    next(error)
  }
}


module.exports.get_deleteStory = async (req, res, next) => {
  try {
    const {id} = req.params;

    await Story.findByIdAndRemove(id);

    res.redirect('/stories')
  } catch (error) {
    next(error);
  }
}