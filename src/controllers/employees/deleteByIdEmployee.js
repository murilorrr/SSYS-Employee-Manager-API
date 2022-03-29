const { StatusCodes } = require('http-status-codes');
const { deleteById } = require('../../services/employees');

const deleteOneEmployee = async (req, res, next) => {
  const { id } = req.params;
  try {
    await deleteById(id);
    return res.status(StatusCodes.NO_CONTENT).json({});
  } catch (error) {
    return next(error);
  }
};

module.exports = deleteOneEmployee;
