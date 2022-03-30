const { Employee } = require('../src/database/models');

module.exports = async() => {
  const employees = await Employee.findAll({
    attributes: {
      exclude: ['password'],
    },
  });
  return employees;
}