const chai = require("chai");
const chaiHttp = require("chai-http");
const { MongoClient } = require('mongodb');
const connectionMock = require('../utils/connectionMock');
const dbName = process.env.DBNAME;

chai.use(chaiHttp);

const server = require("../src/server/app");

const { expect } = chai;

const employee = {
  "name": "Anakin Skywalker",
  "department": "Architecture",
  "email": "skywalker@ssys.com.br",
  "password": "beStrong",
  "salary": "4000.00",
  "birth_date": "01-01-1983"
};

describe('POST /employee', () => {
  let connection;
  let response;
  let db;

  before( async () => {
    connection = await connectionMock();

    sinon.stub(MongoClient, 'connect')
      .resolves(connection);
    
    db = connection.db(dbName);
  });

  after( async () => {
    MongoClient.connect.restore();
  });

  test('Quando é criado com sucesso', async () => {
      response = await chai.request(server)
        .post('/employees')
        .set('content-type', 'application/json')
        .send(employee);

      expect(response).to.have.status(201);

      expect(response.body).to.be.a('object');

      expect(response.body).to.have.property('employee');
      const [keys, _password] = response.bodysObject.keys(user);
      keys.forEach((key) => {
          expect(response.body.user[key]).to.be.equal(user[key]);
      });
  });
});