const create = require('./createEmployee');
const getAll = require('./getAllEmployees');
const login = require('./login');
const getById = require('./getByIdEmployee');
const deleteById = require('./deleteByIdEmployee');
const updateById = require('./updateByIdEmployee');

module.exports = {
  createOne: create,
  getAll,
  login,
  getById,
  deleteById,
  updateById,
};
