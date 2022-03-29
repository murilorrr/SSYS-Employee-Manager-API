const { Employee } = require('../../database/models');
const { customError } = require('../../../utils');

module.exports = async (id) => {
  const employee = await Employee.findOne({
    where: { id },
    attributes: {
      exclude: ['password'],
    },
  });

  if (!employee) throw customError(404, 'Employee not found');

  return employee;
};
