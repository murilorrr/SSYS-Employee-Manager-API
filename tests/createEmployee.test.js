const chai = require("chai");
const chaiHttp = require("chai-http");
const { MongoClient } = require("mongodb");
const connectionMock = require("../utils/connectionMock");
const dbName = process.env.DATABASE_NAME;
const sinon = require("sinon");

chai.use(chaiHttp);

const server = require("../src/server/app");
const { it } = require("mocha");

const { expect } = chai;

const employee = {
  name: "Anakin Skywalker",
  department: "Architecture",
  email: "skywalker@ssys.com.br",
  password: "beStrong",
  salary: "4000.00",
  birth_date: "01-01-1983",
};

describe("POST /employees", () => {
  let connection;
  let response;
  let db;

  before(async () => {
    connection = await connectionMock();

    sinon.stub(MongoClient, "connect").resolves(connection);

    db = connection.db(dbName);
  });

  after(async () => {
    MongoClient.connect.restore();
  });

  it("Quando é criado com sucesso", async () => {
    response = await chai
      .request(server)
      .post("/employees")
      .set("content-type", "application/json")
      .send(employee);

    expect(response).to.have.status(201);

    expect(response.body).to.be.a("object");

    expect(response.body).to.have.property("employee");
    const SUT = response.body.employee;
    console.log(SUT);
    const arrayOfKeys = Object.keys(SUT);
    arrayOfKeys.forEach((key) => {
      expect(SUT[key]).to.be.equal(employee[key]);
    });
  });
});
