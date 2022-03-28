const { StatusCodes } = require('http-status-codes');
const { getAll } = require('../../services/employees');

module.exports = async (req, res, next) => {
  try {
    const result = await getAll();
    return res.status(StatusCodes.OK).json(result);
  } catch (error) {
    return next(error);
  }
};
