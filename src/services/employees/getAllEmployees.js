const Employee = require('../../model')('Employee');

module.exports = async () => {
  const employees = await Employee.getAll();

  const employeesWithOutPassword = [];

  employees.forEach((employee) => {
    const { _id, password, ...outherKeys } = employee;
    employeesWithOutPassword.push(outherKeys);
  });

  return employeesWithOutPassword;
};
