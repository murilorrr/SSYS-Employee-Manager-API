const chai = require('chai');
const chaiHttp = require('chai-http');
const { generateNEmployees } = require('../src/utils');
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

describe('GET ById /employees/:id', () => {
  let response;
  let token;

  const employees = generateNEmployees(1);
  employees.push(defaultEmployee);

  before(async () => {
    Employee.destroy({ where: {} });
    await Promise.all(
      employees.map((employee) =>
        chai.request(server).post('/employees').set('content-type', 'application/json').send(employee),
      ),
    );
  });

  after(() => {
    Employee.destroy({ where: {} });
  });

  it('Quando é requisitado o trabalhador"employee" por id', async () => {
    const loginRequest = await chai.request(server).post('/employees/login').send(defaultEmployee);

    token = loginRequest.body.token;

    responseAll = await chai.request(server).get('/employees').set('authorization', token);
    const SUT = responseAll.body.find((employee) => employee.email == employees[0].email);
    response = await chai.request(server).get(`/employees/${SUT.id}`).set('authorization', token);

    delete employees[0].password;

    console.table(employees);

    expect(response.body).to.be.a('object');
    expect(response.body).have.property('id');
    expect({ ...employees[0], id: SUT.id }).to.be.deep.equal(response.body);
  });

  it('Quando é requisitado o trabalhador"employee" por id que NÃO EXISTE', async () => {
    const loginRequest = await chai.request(server).post('/employees/login').send(defaultEmployee);

    token = loginRequest.body.token;

    response = await chai.request(server).get(`/employees/999999999999999`).set('authorization', token);

    expect(response.body).to.be.a('object');
    expect(response.body).to.be.deep.equal({ message: 'Employee not found' });
  });
});
