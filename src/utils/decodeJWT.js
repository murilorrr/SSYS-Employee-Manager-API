const JWT = require('jsonwebtoken');
require('dotenv').config();

const secret = process.env.SECRET;

module.exports = (token) => {
  const decoded = JWT.verify(token, secret);
  const result = decoded;
  return result;
};