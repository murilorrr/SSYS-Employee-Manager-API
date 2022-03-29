const { StatusCodes } = require('http-status-codes');
const { login: loginService } = require('../../services/employees');

const login = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    const result = await loginService(email, password);

    return res.status(StatusCodes.OK).json(result);
  } catch (err) {
    return next(err);
  }
};

module.exports = login;
