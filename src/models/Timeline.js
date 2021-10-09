const mongoose = require('mongoose');

const timelineSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  desc: {
    type: String,
    required: true
  },  
  image: {
    type: String,
  },
  timeline: {
    type: String,
    required: true
  }
}, {
  timestamps: true
})

const Timeline = mongoose.model("Timeline", timelineSchema);

module.exports = Timeline;