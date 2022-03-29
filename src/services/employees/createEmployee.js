const Joi = require('joi');
const { StatusCodes } = require('http-status-codes');
const { customError, encryptPassword } = require('../../../utils');
const { Employee } = require('../../database/models');

const employeeSchema = Joi.object({
  name: Joi.string().min(3).required(),
  department: Joi.string().min(3).required(),
  email: Joi.string().email().required(),
  salary: Joi.string().min(6).required(),
  password: Joi.string().min(6).required(),
  birth_date: Joi.string().required(),
});

const alreadyExists = async (email) => {
  const employee = await Employee.findOne({ where: { email } });
  return employee || null;
};

module.exports = async (employee) => {
  const {
    name, email, password, department, salary, birth_date,
  } = employee;
  const { error } = employeeSchema.validate(employee);
  if (error) throw customError(StatusCodes.BAD_REQUEST, error.message);

  const exists = await alreadyExists(email);
  if (exists) {
    throw customError(StatusCodes.CONFLICT, 'Employee already registered');
  }

  const hashPassword = encryptPassword(password);

  await Employee.create({
    name,
    email,
    password: hashPassword,
    department,
    salary,
    birth_date,
  });

  const result = await Employee.findOne({
    employee,
    attributes: {
      exclude: ['password'],
    },
  });

  return { employee: result };
};
