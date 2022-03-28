const Employee = require('../../model')('Employee');

module.exports = async () => {
  const employees = await Employee.getAll();

  const employeesWithOutPassword = [];

  employees.forEach((employee) => {
    const { _id: id, password, ...outherKeys } = employee;
    employeesWithOutPassword.push({ ...outherKeys, id });
  });

  return employeesWithOutPassword;
};
