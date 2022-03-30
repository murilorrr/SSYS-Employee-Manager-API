const defaultResponseOK = require('../../utils/defaultResponseOk');
const { reportByAge } = require('../../services/reports');

module.exports = async (req, res, next) => {
  try {
    const result = await reportByAge();
    return defaultResponseOK(res, result);
  } catch (error) {
    return next(error);
  }
};
