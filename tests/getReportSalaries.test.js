const chai = require('chai');
const chaiHttp = require('chai-http');
const { MongoClient } = require('mongodb');
const connectionMock = require('../utils/connectionMock');
const dbName = process.env.DATABASE_NAME;
const sinon = require('sinon');
const { generateNEmployees } = require('../utils');

chai.use(chaiHttp);

const server = require('../src/server/app');
const { it } = require('mocha');
const { report } = require('../src/server/app');

const { expect } = chai;

describe.only('GET /reports/employees/salary/', () => {
  let connection;
  let response;
  let db;

  const randomNumberOfEmployeesMaxEleven = Math.ceil(Math.random() * 10);
  const employees = generateNEmployees(randomNumberOfEmployeesMaxEleven);

  before(async () => {
    connection = await connectionMock();

    sinon.stub(MongoClient, 'connect').resolves(connection);

    db = connection.db(dbName);
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

    const buildReport = (employees) => {
      report = {};
      const minSalary = 0;
      const maxSalary = 0;
      employees.forEach((employee) => {
        if (employee.salary < minSalary) {
          minSalary = employee.salary;
          report.lowest = employee;
        }
        if (employee.salary > maxSalary) {
          maxSalary = employee.salary;
          report.highest = employee;
        }
      });
    };

    buildReport(employees);

    response = await chai.request(server).get('/reports/employees/salary/');

    report.forEach((employee) => {
      delete employee.password;
    });

    console.log('employees:');
    console.table(employees);

    expect(response.body).to.be.deep.equal(report);
  });
});
