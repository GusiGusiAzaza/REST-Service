const uuid = require('uuid');
const mongoose = require('mongoose');

class Column {
  constructor({ id = uuid(), title = 'column title', order = 0 } = {}) {
    this.id = id;
    this.title = title;
    this.order = order;
  }

  static create(column) {
    return new Column(column);
  }
}

const boardSchema = new mongoose.Schema({
  _id: {
    type: String,
    default: uuid
  },
  title: String,
  _columns: [],
  get columns() {
    return this._columns;
  },
  set columns(colCollection) {
    this._columns = colCollection.map(Column.create);
  }
});

boardSchema.statics.toResponse = ({ id, columns, title }) => ({
  id,
  columns,
  title
});

const Board = mongoose.model('Board', boardSchema);

module.exports = Board;
