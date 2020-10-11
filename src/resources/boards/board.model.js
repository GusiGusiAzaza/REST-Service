const uuid = require('uuid');

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

class Board {
  constructor({ id = uuid(), title = 'board title', columns = [] } = {}) {
    this.id = id;
    this.title = title;
    this.columns = columns.map(Column.create);
  }
}

module.exports = Board;
