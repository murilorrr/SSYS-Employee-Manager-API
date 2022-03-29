const { StatusCodes } = require('http-status-codes');
const bcrypt = require("bcrypt");
const Joi = require('joi');
const { Employee } = require('../../database/models');
const { generateJWT } = require('../../../utils');
const { customError } = require('../../../utils');

const loginSchema = Joi.object({
  email: Joi.string().regex(/\S+@\S+\.\S+/).required(),
  password: Joi.string().min(6).required(),
});

const alreadyExists = async (email, password) => {
  const employee = await Employee.findOne({ where: { email } });

  if (employee) {
    const compare = bcrypt.compareSync(password, employee.password);
    if (compare) {
      return employee;
    }
    return false;
  }

  return false;
};

const validateLogin = async (email, password) => {
  const { error } = loginSchema.validate({ email, password });
  if (error) throw customError(StatusCodes.BAD_REQUEST, error.message);

  const userFound = await alreadyExists(email, password);
  if (!userFound) {
    throw customError(StatusCodes.NOT_FOUND, 'Invalid fields');
  }

  const { password: _password, ...employeeWithoutPassword } = userFound.dataValues;

  const token = generateJWT(employeeWithoutPassword);

  return { token };
};

module.exports = validateLogin;
