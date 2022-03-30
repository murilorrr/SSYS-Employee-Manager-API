const express = require('express');
const bodyParser = require('body-parser');
const rateLimit = require('express-rate-limit');
const { StatusCodes } = require('http-status-codes');
const errorMiddleware = require('../middlewares/errorMiddleware');
const { employee, report } = require('../routes/index');

const limiter = rateLimit({
  windowMs: 1 * 60 * 1000, // 1 minute
  max: 150, // Limit each IP to 150 requests per `window` (here, per 15 minutes)
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
});

const app = express();
app.use(bodyParser.json());
app.use(limiter);

app.get('/', (req, res) => res.status(StatusCodes.OK).json({ message: 'are you mad?' }));

app.use('/employees', employee);

app.use('/reports', report);

app.use(errorMiddleware);

module.exports = app;
