const { StatusCodes } = require('http-status-codes');
const { updateById } = require('../../services/employees');

const updateOneEmployee = async (req, res, next) => {
  const { id } = req.params;
  const employeePatch = req.body;
  try {
    const employee = await updateById(id, employeePatch);
    return res.status(StatusCodes.OK).json(employee);
  } catch (error) {
    return next(error);
  }
};

module.exports = updateOneEmployee;
