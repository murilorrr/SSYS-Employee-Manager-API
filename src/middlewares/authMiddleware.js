require('dotenv').config();

const status = require('http-status-codes').StatusCodes;
const JWT = require('jsonwebtoken');
const { customError, decodeJWT } = require('../utils');

const secret = process.env.SECRET;

const authMiddleware = (req, _res, next) => {
  const { authorization } = req.headers;
  try {
    JWT.verify(authorization, secret);
    const data = decodeJWT(authorization);
    req.user = data;
  } catch (err) {
    if (!authorization) throw customError(status.UNAUTHORIZED, 'Token not found');
    throw customError(status.UNAUTHORIZED, 'Expired or invalid token');
  }
  return next();
};

module.exports = authMiddleware;
