const uuid = require('uuid');
const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
  _id: {
    type: String,
    default: uuid
  },
  title: String,
  order: Number,
  description: String,
  userId: String,
  boardId: String,
  columnId: String
});

taskSchema.statics.toResponse = ({
  id,
  title,
  order,
  description,
  userId,
  boardId,
  columnId
}) => ({ id, title, order, description, userId, boardId, columnId });

const Task = mongoose.model('Task', taskSchema);

module.exports = Task;
