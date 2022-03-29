const create = require('./createEmployee');
const getAll = require('./getAllEmployees');
const login = require('./login');

module.exports = {
  createOne: create,
  getAll,
  login,
};
