const chai = require('chai');
const chaiHttp = require('chai-http');
const { generateNEmployees } = require('../utils');
const { Employee } = require('../src/database/models');
const moment = require('moment');
chai.use(chaiHttp);

const server = require('../src/server/app');
const { it } = require('mocha');

const { expect } = chai;

describe.only('GET /reports/employees/age/ (age report)', () => {
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

  it('Quando são requisitados todos os trabalhadores"employees" em um relatorio de idade', async () => {
    await Promise.all(
      employees.map((employee) =>
        chai.request(server).post('/employees').set('content-type', 'application/json').send(employee)
      )
    );

    const buildReport = (employees) => {
      const report = {};
      const ages = employees.map((employee) => moment(moment(employee.birth_date, "DD-MM-YYYY").format("YYYY-MM-DD")));
      let older = moment.min(ages);
      let younger = moment.max(ages);

      employees.forEach((employee) => {
        if ( employee.birth_date == moment(younger).format("DD-MM-YYYY")) {
          report.younger = employee;
        }

        if ( employee.birth_date == moment(older).format("DD-MM-YYYY")) {
          report.older = employee;
        }
      });

      Object.keys(report).forEach((key) => {
        delete report[key].password;
      });

      return report;
    };

    console.table(employees);
    const report = buildReport(employees);

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
