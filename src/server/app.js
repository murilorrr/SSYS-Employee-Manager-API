const express = require('express');
const bodyParser = require('body-parser');
const { StatusCodes } = require('http-status-codes');

const app = express();
app.use(bodyParser.json());

app.get('/', (req, res) => res.status(StatusCodes.OK).json({ message: 'OK' }));

module.exports = app;
