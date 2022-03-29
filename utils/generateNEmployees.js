const employeeFactory = require('./employeeFactory');

const generateNEmployees = (numberOfEmployees) => {
  const arrayOfEmployees = Array();
  for (let index = 0; index < numberOfEmployees; index++) {
    arrayOfEmployees.push(employeeFactory());
  }
  return arrayOfEmployees;
}

module.exports = generateNEmployees;
