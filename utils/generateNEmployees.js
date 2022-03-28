const employeeFactory = require('./employeeFactory');

const generateNEmployees = (numberOfEmployees) => {
  arrayOfEmployees = [];
  for (let index = 0; index < numberOfEmployees; index++) {
    arrayOfEmployees.push(employeeFactory());
  }
  return arrayOfEmployees;
}

module.exports = generateNEmployees;
