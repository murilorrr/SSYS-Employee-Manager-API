const chai = require('chai');
const chaiHttp = require('chai-http');
const { generateNEmployees } = require('../utils');
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

describe('GET /employees', () => {
  let response;
  let token;

  const randomNumberOfEmployeesMaxEleven = Math.ceil(Math.random() * 10);
  const employees = generateNEmployees(randomNumberOfEmployeesMaxEleven);
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

  it('Quando são requisitados todos os trabalhadores"employees"', async () => {
    const loginRequest = await chai.request(server).post('/employees/login').send(defaultEmployee);

    token = loginRequest.body.token;

    response = await chai.request(server).get('/employees').set('authorization', token);

    employees.forEach((employee) => {
      delete employee.password;
    });

    console.table(employees);

    response.body.forEach((employee) => {
      expect(employee).have.property('id');
      delete employee.id;
      expect(employees).to.be.deep.includes(employee);
    });
  });
});
