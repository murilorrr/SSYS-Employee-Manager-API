const { StatusCodes } = require('http-status-codes');
const { customError } = require('../../../utils');
const employeesWithOutPass = require('../../../utils/findEmployeesWithOutPass');

module.exports = async () => {
  const employees = await employeesWithOutPass();
  if (employees.length === 0) {
    throw customError(StatusCodes.NOT_FOUND, 'Employees not found');
  }
  return employees;
};
