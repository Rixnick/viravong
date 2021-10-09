const mkdirp = require("mkdirp");
const Timeline = require('../models/Timeline');

module.exports.get_allTimeline = async (req, res, next) => {
  try {
    const times = await Timeline.find({}).sort({ createdAt: -1 });
    res.render('admin/timeline/Timeline', {
      times: times
    })
  } catch (error) {
    next(error)
  }
}


module.exports.get_addTimeline = async (req, res, next) => {
  try {
    res.render('admin/timeline/Add')
  } catch (error) {
    next(error)
  }
}

module.exports.post_addTimeline = async (req, res, next) => {
  try {
    const imageFile = typeof req.files.trophyImage !== 'undefined' ? req.files.trophyImage.name : "";
    const {title, desc, timeline} =req.body;

    const timelines = new Timeline({
      title: title,
      desc: desc,
      image: imageFile,
      timeline: timeline
    });

    await timelines.save(function(error){
      if(error)
        return console.log(error);

      mkdirp.sync('./public/uploads/trophies/', timelines._id);

      if(imageFile != ""){
        const trophyImage = req.files.trophyImage;
        const path = './public/uploads/trophies/' + timelines._id + '/' + imageFile;

        trophyImage.mv(path, function(error){
          return console.log(error)
        });
      }
    });

    res.redirect('/timelines');

  } catch (error) {
    next(error)
  }
}

module.exports.get_updateTimeline = async (req, res, next) => {
  try {
    const {id} = req.params;

    const time = await Timeline.findById(id);

    res.render('admin/timeline/Update', {
      title: time.title,
      desc: time.desc,
      image: time.image,
      timeline: time.timeline,
      id: time._id
    });
  } catch (error) {
    next(error)
  }
}

module.exports.post_updateTimeline = async (req, res, next) => {
  try {
    const {id} = req.params;

    await Timeline.update({_id: id}, req.body);

    res.redirect('/timelines');
  } catch (error) {
    next(error)
  }
}

module.exports.get_deleteTimeline = async (req, res, next) => {
  try {
    const {id} = req.params;

    await Timeline.findByIdAndRemove(id);

    res.redirect('/timelines')
  } catch (error) {
    next(error)
  }
}