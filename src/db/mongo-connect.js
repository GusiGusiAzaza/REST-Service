const mongoose = require('mongoose');
const { MONGO_CONNECTION_STRING } = require('../common/config');

const User = require('../resources/users/user.model');
const admin = new User({ name: 'Admin', login: 'admin', password: 'admin' });

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
      admin.save();
    })
    .catch(e => {
      console.log(e);
      this.reject();
    });
};

module.exports = mongoConnect;
