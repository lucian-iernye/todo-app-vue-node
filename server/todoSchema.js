const mongoose = require("mongoose");
const todoSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  completed: {
    type: Boolean,
    required: true,
  },
  created: {
    type: Date,
    default: Date.now,
  },
});

const todo = (module.exports = mongoose.model("Todo", todoSchema));
