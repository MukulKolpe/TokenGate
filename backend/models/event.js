const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  isApproved: {
    type: Boolean,
    default: false,
  },
  time: {
    type: String,
  },
  date: {
    type: String,
  },
  image: {
    type: String,
  },
  mode: {
    type: String,
    enum: ["Online", "In-Person"],
  },
  location: {
    type: String,
  },
  price: {
    type: Number,
    default: 0,
  },
  tickets: {
    type: Number,
    required: true,
  },
  domain: {
    type: String,
    enum: ["Tech", "Literature", "Art", "Music", "Dance", "Sports", "Other"],
  },
});

module.exports = mongoose.model("Event", eventSchema);
