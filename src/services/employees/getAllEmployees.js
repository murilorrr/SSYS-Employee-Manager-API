const employeeWithoutPassword = require('../../../utils/findEmployeesWithOutPass');

module.exports = async () => {
  const employees = await employeeWithoutPassword();

  return employees;
};
