const chai = require('chai');
const chaiHttp = require('chai-http');
const { generateNEmployees } = require('../utils');
const { Employee } = require('../src/database/models');

chai.use(chaiHttp);

const server = require('../src/server/app');
const { it } = require('mocha');

const { expect } = chai;

describe.only('GET /reports/employees/salary/', () => {
  let response;

  const randomNumberOfEmployeesMaxEleven = Math.ceil(Math.random() * 10);
  const employees = generateNEmployees(randomNumberOfEmployeesMaxEleven);
  console.log('employees:');
  console.table(employees);

  before(() => {
    Employee.destroy({ where: {} });
  });

  after(() => {
    Employee.destroy({ where: {} });
  });

  it('Quando são requisitados todos os trabalhadores"employees"', async () => {
    await Promise.all(
      employees.map((employee) =>
        chai.request(server).post('/employees').set('content-type', 'application/json').send(employee)
      )
    );

    const buildReport = (employees) => {
      const report = {};
      let minSalary = 999999;
      let maxSalary = 0;
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
      return report;
    };

    const report = buildReport(employees);
    Object.keys(report).forEach((key) => {
      delete report[key].password;
    });

    response = await chai.request(server).get('/reports/employees/salary/');

    expect(response.status).to.be.equal(200);
    expect(response.body).to.not.be.equal({});

    Object.keys(response.body).forEach((key) => {
      Object.keys(response.body[key]).forEach((employeeKeys) => {
        if (employeeKeys === 'id') return expect(response.body[key][employeeKeys]).to.not.be.equal('');
        expect(response.body[key][employeeKeys]).to.be.equal(report[key][employeeKeys]);
      });
    });
  });
});
