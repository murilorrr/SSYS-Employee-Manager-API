const express = require("express");
const bodyParser = require("body-parser");
const { StatusCodes } = require("http-status-codes");
const errorMiddleware = require("../middlewares/errorMiddleware");
const { employee } = require("../routes/index");

const app = express();
app.use(bodyParser.json());

app.get("/", (req, res) => res.status(StatusCodes.OK).json({ message: "OK" }));

app.use("/employees", employee);

app.use(errorMiddleware);

module.exports = app;
