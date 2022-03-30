const { StatusCodes } = require('http-status-codes');

const defaultResponseOK = (res, result) => res.status(StatusCodes.OK).json(result);

module.exports = defaultResponseOK;