const express = require('express');
const bodyParser = require('body-parser');
const { StatusCodes } = require('http-status-codes');
const errorMiddleware = require('../middlewares/errorMiddleware');

const app = express();
app.use(bodyParser.json());

app.get('/', (req, res) => res.status(StatusCodes.OK).json({ message: 'OK' }));

app.use(errorMiddleware);

module.exports = app;
