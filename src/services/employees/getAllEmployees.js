const Employee = require('../../model')('Employee');

module.exports = async () => {
  const employees = await Employee.getAll();

  return employees;
};
