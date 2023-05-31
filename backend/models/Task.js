const mongoose = require('mongoose');

const subTaskSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  status: {
    type: Boolean,
    default: false
  },
  id: {
    type: String,
    required:true
  }
});

const taskSchema = new mongoose.Schema({
  task: {
    type: String,
    required: true
  },
  subTasks: [subTaskSchema],
  status: {
    type: Boolean,
    default: false
  }
});

const Tasks = mongoose.model('Task', taskSchema);

module.exports = Tasks;
