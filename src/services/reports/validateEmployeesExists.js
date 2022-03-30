const { StatusCodes } = require('http-status-codes');
const { customError } = require('../../utils');
const { employeeWithoutPassword } = require('../../utils');

module.exports = async () => {
  const employees = await employeeWithoutPassword();
  if (employees.length === 0) {
    throw customError(StatusCodes.NOT_FOUND, 'Employees not found');
  }
  return employees;
};
