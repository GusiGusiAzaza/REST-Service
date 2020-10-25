const mongoose = require('mongoose');
const { MONGO_CONNECTION_STRING } = require('../common/config');

const mongoConnect = async () => {
  await mongoose
    .connect(MONGO_CONNECTION_STRING, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
      useCreateIndex: true
    })
    .then(() => {
      console.log('MongoDB connected successfully');
    })
    .catch(e => {
      console.log(e);
      this.reject();
    });
};

module.exports = mongoConnect;