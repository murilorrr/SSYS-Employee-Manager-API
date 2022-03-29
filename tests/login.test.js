const chai = require('chai');
const chaiHttp = require('chai-http');
const { Employee } = require('../src/database/models');

chai.use(chaiHttp);

const server = require('../src/server/app');
const { it } = require('mocha');

const { expect } = chai;

const employeeLogin = {
  email: 'skywalker@ssys.com.br',
  password: 'beStrong',
};

const employee = {
  name: 'Anakin Skywalker',
  department: 'Architecture',
  email: 'skywalker@ssys.com.br',
  password: 'beStrong',
  salary: '4000.00',
  birth_date: '01-01-1983',
};

describe('POST /employees/login', () => {
  let response;

  before(() => {
    Employee.destroy({ where: {} });
  });

  after(() => {
    Employee.destroy({ where: {} });
  });

  it('Quando é criado com sucesso', async () => {
    await chai.request(server).post('/employees').set('content-type', 'application/json').send(employee);

    response = await chai.request(server).post('/employees/login').set('content-type', 'application/json').send(employeeLogin);

    expect(response).to.have.status(200);
    expect(response.body).to.have.property('token');
    expect(response.body).to.have.property('token').to.be.a('string');
    expect(response.body).to.have.property('token').have.length.greaterThanOrEqual(1);
  });
});
