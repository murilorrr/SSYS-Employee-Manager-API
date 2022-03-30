const { employeeWithoutPassword } = require('../../utils');

module.exports = async () => {
  const employees = await employeeWithoutPassword();

  return employees;
};
