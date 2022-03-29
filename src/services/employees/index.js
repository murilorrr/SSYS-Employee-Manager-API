const create = require('./createEmployee');
const getAll = require('./getAllEmployees');
const login = require('./login');
const getById = require('./getByIdEmployee');

module.exports = {
  createOne: create,
  getAll,
  login,
  getById,
};
