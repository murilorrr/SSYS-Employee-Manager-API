const defaultResponseOK = require('../../utils/defaultResponseOk');
const { updateById } = require('../../services/employees');

const updateOneEmployee = async (req, res, next) => {
  const { id } = req.params;
  const employeePatch = req.body;
  try {
    const employee = await updateById(id, employeePatch);
    return defaultResponseOK(res, employee);
  } catch (error) {
    return next(error);
  }
};

module.exports = updateOneEmployee;
