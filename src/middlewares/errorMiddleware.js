const errorMiddleware = (err, _req, res, next) => {
  if (err.code) {
    return res.status(err.code).json(err);
  }

  if (err) {
    res.status(500).json({ message: "Internal Server Error" });
  }

  return next();
};

module.exports = errorMiddleware;
