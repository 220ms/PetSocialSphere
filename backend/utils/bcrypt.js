const bcrypt = require("bcrypt");
exports.hashValue = async (value, saltRounds) => {
  return bcrypt.hash(value, saltRounds || 10);
};

exports.compareValue = async (value, hashedValue) => {
  return bcrypt.compare(value, hashedValue).catch(() => false);
};
