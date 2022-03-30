const defaultResponseOK = require('../../../utils/defaultResponseOk');
const { getAll } = require('../../services/employees');

module.exports = async (req, res, next) => {
  try {
    const result = await getAll();
    return defaultResponseOK(res, result);
  } catch (error) {
    return next(error);
  }
};
