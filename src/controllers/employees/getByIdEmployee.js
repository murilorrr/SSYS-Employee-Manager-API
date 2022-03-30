const defaultResponseOK = require('../../../utils/defaultResponseOk');
const { getById } = require('../../services/employees');

module.exports = async (req, res, next) => {
  const { id } = req.params;
  try {
    const result = await getById(id);
    return defaultResponseOK(res, result);
  } catch (error) {
    return next(error);
  }
};
