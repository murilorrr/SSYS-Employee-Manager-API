const Joi = require('joi');
const { StatusCodes } = require('http-status-codes');
const { customError } = require('../../../utils');
const Employee = require('../../model')('Employee');

const employeeSchema = Joi.object({
  name: Joi.string().min(3).required(),
  department: Joi.string().min(3).required(),
  email: Joi.string().email().required(),
  salary: Joi.string().alphanum().required(),
  password: Joi.string().min(6).required(),
  birth_date: Joi.string().dataUri().required,
});

const alreadyExists = async (email) => {
  const employee = await Employee.getOneByEmail(email);
  return employee || null;
};

module.exports = async (employee) => {
  const { error } = employeeSchema.validate(employee);
  if (error) throw customError(StatusCodes.BAD_REQUEST, error.message);

  const { email } = employee;
  const exists = await alreadyExists(email);
  if (exists) throw customError(StatusCodes.CONFLICT, 'Employee already registered');

  await Employee.createOne(employee);

  return { employee };
};
