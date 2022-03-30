const defaultResponseOK = require('../../utils/defaultResponseOk');
const { login: loginService } = require('../../services/employees');

const login = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    const result = await loginService(email, password);

    return defaultResponseOK(res, result);
  } catch (err) {
    return next(err);
  }
};

module.exports = login;
