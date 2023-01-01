const { Module } = require('module');
const mongoose = require('mongoose');
// database schema for the task
const TaskScehema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'A Task must have a name'],
    unique: true,
  }, // to make sure that the name is unique
});

// create a model for the task
const Task = mongoose.model("Task", TaskScehema);
module.exports = Task;