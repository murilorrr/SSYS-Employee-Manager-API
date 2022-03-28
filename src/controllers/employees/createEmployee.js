const { StatusCodes } = require("http-status-codes");
const { createOne } = require("../../services/employees");

module.exports = async (req, res, next) => {
  const employee = req.body;
  try {
    const result = await createOne(employee);
    return res.status(StatusCodes.CREATED).json(result);
  } catch (error) {
    return next(error);
  }
};
