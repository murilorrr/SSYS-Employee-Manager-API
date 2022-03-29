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

  before(async () => {
    Employee.destroy({ where: {} });
    await chai.request(server).post('/employees').set('content-type', 'application/json').send(employee);
  });

  after(() => {
    Employee.destroy({ where: {} });
  });

  it('Será validado que é possível fazer login com sucesso', async () => {
    response = await chai
      .request(server)
      .post('/employees/login')
      .set('content-type', 'application/json')
      .send(employeeLogin);

    expect(response).to.have.status(200);
    expect(response.body).to.have.property('token');
    expect(response.body).to.have.property('token').to.be.a('string');
    expect(response.body).to.have.property('token').have.length.greaterThanOrEqual(1);
  });

  it('Será validado que não é possível fazer login sem o campo email', async () => {
    response = await chai
      .request(server)
      .post('/employees/login')
      .set('content-type', 'application/json')
      .send({ password: employee.password });

    expect(response).to.have.status(400);
    expect(response.body).to.be.deep.equal({
      message: '"email" is required',
    });
  });

  it('Será validado que não é possível fazer login sem o campo password', async () => {
    response = await chai
      .request(server)
      .post('/employees/login')
      .set('content-type', 'application/json')
      .send({ email: employee.email });

    expect(response.status).to.be.equal(400);
    expect(response.body).to.be.deep.equal({
      message: '"password" is required',
    });
  });

  it('Será validado que não é possível fazer login de um usuário que não existe', async () => {
    response = await chai
      .request(server)
      .post('/employees/login')
      .set('content-type', 'application/json')
      .send({ email: `${employee.email}0000`, password: employee.password });

    expect(response.status).to.be.equal(404);
    expect(response.body).to.be.deep.equal({ message: 'Invalid fields' });
  });
});
