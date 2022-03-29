const chai = require('chai');
const chaiHttp = require('chai-http');
const { generateNEmployees } = require('../utils');

chai.use(chaiHttp);

const server = require('../src/server/app');
const { it } = require('mocha');
const { report } = require('../src/server/app');

const { expect } = chai;

describe('GET /reports/employees/salary/', () => {
  let response;

  const randomNumberOfEmployeesMaxEleven = Math.ceil(Math.random() * 10);
  const employees = generateNEmployees(randomNumberOfEmployeesMaxEleven);

  before(async () => {});

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
