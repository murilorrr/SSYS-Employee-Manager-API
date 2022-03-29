const { StatusCodes } = require('http-status-codes');
const { getById } = require('../../services/employees');

module.exports = async (req, res, next) => {
  const { id } = req.params;
  try {
    const result = await getById(id);
    return res.status(StatusCodes.OK).json(result);
  } catch (error) {
    return next(error);
  }
};
