const chai = require('chai');
const chaiHttp = require('chai-http');
const { generateNEmployees } = require('../utils');

chai.use(chaiHttp);

const server = require('../src/server/app');
const { it } = require('mocha');

const { expect } = chai;

describe.only('GET /employees', () => {
  let response;

  const randomNumberOfEmployeesMaxEleven = Math.ceil(Math.random() * 10);
  const employees = generateNEmployees(randomNumberOfEmployeesMaxEleven);

  before(async () => {
  });

  it('Quando são requisitados todos os trabalhadores"employees"', async () => {
    await Promise.all(
      employees.map((employee) =>
        chai
          .request(server)
          .post('/employees')
          .set('content-type', 'application/json')
          .send(employee)
      )
    );

    response = await chai.request(server).get('/employees');

    response.body.forEach((employee) => {
      expect(employee).have.property('id');
    });

    employees.forEach((employee) => {
      delete employee.password;
    });

    console.log('employees:');
    console.table(employees);

    expect(response.body).to.be.deep.equal(employees);
  });
});
