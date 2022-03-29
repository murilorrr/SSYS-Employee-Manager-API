const { Employee } = require('../../database/models');
const { customError } = require('../../../utils');

module.exports = async (id, employeePatch) => {
  const employee = await Employee.findOne({
    where: { id },
    attributes: {
      exclude: ['password'],
    },
  });

  if (!employee) throw customError(404, 'Employee not found');

  await Employee.update(employeePatch, { where: { id } });
  return Employee.findOne({
    where: { id },
    attributes: {
      exclude: ['password'],
    },
  });
};
