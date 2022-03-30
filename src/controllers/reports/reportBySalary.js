const { reportBySalary } = require('../../services/reports');
const defaultResponseOK = require('../../../utils/defaultResponseOk');

module.exports = async (req, res, next) => {
  try {
    const result = await reportBySalary();
    return defaultResponseOK(res, result);
  } catch (error) {
    return next(error);
  }
};
