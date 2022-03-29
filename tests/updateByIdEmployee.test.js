const chai = require('chai');
const chaiHttp = require('chai-http');
const { Employee } = require('../src/database/models');

chai.use(chaiHttp);

const server = require('../src/server/app');
const { it } = require('mocha');

const { expect } = chai;

const defaultEmployee = {
  name: 'Anakin Skywalker',
  department: 'Architecture',
  email: 'skywalker@ssys.com.br',
  password: 'beStrong',
  salary: '4000.00',
  birth_date: '01-01-1983',
};

const updateEmployee = {
  name: 'Anakin Skywalker',
  department: 'department of chaos',
  email: 'skywalker@ssys.com.br',
  password: 'beStrong',
  salary: '9990.00',
  birth_date: '01-01-1983',
}

describe('PUT ById /employees/:id', () => {
  let response;
  let token;
  let id;

  before(async () => {
    Employee.destroy({ where: {} });
    const insertOperation = await chai.request(server).post('/employees').set('content-type', 'application/json').send(defaultEmployee);
    id = insertOperation.body.employee.id
  });

  after(() => {
    Employee.destroy({ where: {} });
  });

  it('Quando é updatado o trabalhador"employee" por id', async () => {
    const loginRequest = await chai.request(server).post('/employees/login').send(defaultEmployee);

    token = loginRequest.body.token;

    response = await chai.request(server).put(`/employees/${id}`).set({
      'authorization': token,
      'content-type': 'application/json',
    })
    .send(updateEmployee);

    delete updateEmployee.password;

    expect(response.body).to.be.a('object');
    expect(response.body).have.property('id');
    expect(response.body.id).to.be.equal(id);
    expect(response.body).to.be.deep.equal({...updateEmployee, id: id});
  });

  it('Quando é requisitado o trabalhador"employee" por id que NÃO EXISTE', async () => {

    response = await chai.request(server).put(`/employees/${id}999999`).set({
      'authorization': token,
      'content-type': 'application/json',
    })
    .send(updateEmployee);

    expect(response.body).to.be.a('object');
    expect(response.status).to.be.equal(404);
    expect(response.body).to.be.deep.equal({ message: 'Employee not found' });
  });
});
