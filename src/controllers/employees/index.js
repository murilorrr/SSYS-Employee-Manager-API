const create = require('./createEmployee');
const getAll = require('./getAllEmployees');
const login = require('./login');
const getById = require('./getByIdEmployee');
const deleteOne = require('./deleteByIdEmployee');
const updateOne = require('./updateByIdEmployee');

module.exports = {
  create,
  getAll,
  login,
  getById,
  deleteOne,
  updateOne,
};
