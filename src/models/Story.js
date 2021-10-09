const mongoose = require('mongoose');

const storySchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  author: {
    type: String,
    required: true
  },
  desc: {
    type: String,
    required: true
  },  
  image: {
    type: String,
    required: true
  },
  timeline: {
    type: String,
    required: true
  }
}, {
  timestamps: true
})

const Story = mongoose.model("Story", storySchema);

module.exports = Story;