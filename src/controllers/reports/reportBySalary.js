const { StatusCodes } = require('http-status-codes');
const { reportBySalary } = require('../../services/reports');

module.exports = async (req, res, next) => {
  try {
    const result = await reportBySalary();
    return res.status(StatusCodes.OK).json(result);
  } catch (error) {
    return next(error);
  }
};
