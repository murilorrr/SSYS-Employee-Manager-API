const chai = require("chai");
const shell = require("shelljs");
const chaiHttp = require("chai-http");

chai.use(chaiHttp);

const server = require("../src/server/app");

const { expect } = chai;

const user = {
  "email": "skywalker@ssys.com.br",
  "password": "beStrong"
};
