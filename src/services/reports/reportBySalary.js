const { StatusCodes } = require('http-status-codes');
const { customError } = require('../../../utils');
const employeesWithOutPass = require('../../../utils/findEmployeesWithOutPass');

const buildReport = (employees) => {
  const report = {};
  let minSalary = 999999;
  let maxSalary = 0;
  employees.forEach((employee) => {
    if (employee.salary < minSalary) {
      minSalary = employee.salary;
      report.lowest = employee;
    }
    if (employee.salary > maxSalary) {
      maxSalary = employee.salary;
      report.highest = employee;
    }
  });
  return report;
};

module.exports = async () => {
  const employees = await employeesWithOutPass();

  if (employees.length === 0) {
    throw customError(StatusCodes.NOT_FOUND, 'Employees not found');
  }

  const report = buildReport(employees);
  return report;
};
