const { StatusCodes } = require('http-status-codes');
const { reportByAge } = require('../../services/reports');

module.exports = async (req, res, next) => {
  try {
    const result = await reportByAge();
    return res.status(StatusCodes.OK).json(result);
  } catch (error) {
    return next(error);
  }
};
