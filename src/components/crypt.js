const bcrypt = require('bcrypt');
const saltRounds = 10;

const getHash = async password => {
  const salt = await bcrypt.genSalt(saltRounds);
  const hash = await bcrypt.hash(password, salt);

  return hash;
};

const compare = async (password, passwordHash) =>
  await bcrypt.compare(password, passwordHash);

module.exports = { getHash, compare };
