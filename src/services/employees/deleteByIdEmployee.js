const { StatusCodes } = require('http-status-codes');
const { customError } = require('../../../utils');
const { Employee } = require('../../database/models');

const validateEmployeeExist = async (id) => {
  const employee = await Employee.findOne({ where: { id } });
  if (!employee) throw customError(StatusCodes.NOT_FOUND, 'User not exists');
};

const deleteById = async (id) => {
  await validateEmployeeExist(id);

  await Employee.destroy({ where: { id } });
};

module.exports = deleteById;
