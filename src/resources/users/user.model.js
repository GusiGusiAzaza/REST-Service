const uuid = require('uuid');
const mongoose = require('mongoose');
const { getHash } = require('../../components/crypt');

const userSchema = new mongoose.Schema({
  _id: {
    type: String,
    default: uuid
  },
  name: String,
  login: String,
  password: String
});

userSchema.statics.toResponse = ({ id, name, login }) => ({ id, name, login });

userSchema.pre('save', async function cryptSave(next) {
  this.password = await getHash(this.password);
  next();
});

userSchema.pre('findOneAndUpdate', async function cryptUpdate(next) {
  this._update.$set.password = await getHash(this._update.$set.password);
  next();
});

const User = mongoose.model('User', userSchema);

module.exports = User;
