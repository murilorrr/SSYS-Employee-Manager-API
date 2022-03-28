const chai = require("chai");
const chaiHttp = require("chai-http");
const { MongoClient } = require('mongodb');
const connectionMock = require('../utils/connectionMock');
const dbName = process.env.DBNAME;

chai.use(chaiHttp);

const server = require("../src/server/app");

const { expect } = chai;

const userLogin = {
  "email": "skywalker@ssys.com.br",
  "password": "beStrong"
};

const user = {
  "name": "Anakin Skywalker",
  "department": "Architecture",
  "email": "skywalker@ssys.com.br",
  "password": "beStrong",
  "salary": "4000.00",
  "birth_date": "01-01-1983"
};

describe('POST /login', () => {
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
      await chai.request(server)
        .post('/employees')
        .set('content-type', 'application/json')
        .send(user);

      response = await chai.request(server)
        .post('/login')
        .set('content-type', 'application/json')
        .send(userLogin);

      expect(response).to.have.status(200);
      expect(response.body).to.have.property('token');
      expect(response.body).to.have.property('token').to.be.a('string');
      expect(response.body).to.have.property('token').have.length.greaterThanOrEqual(1);
  });
});