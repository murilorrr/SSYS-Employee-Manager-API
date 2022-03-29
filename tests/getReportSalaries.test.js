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

describe('GET /reports/employees/salary/ (salary report)', () => {
  let response;
  let token;

  const randomNumberOfEmployeesMaxEleven = Math.ceil(Math.random() * 10);
  const employees = generateNEmployees(randomNumberOfEmployeesMaxEleven);
  employees.push(defaultEmployee);

  before(async () => {
    Employee.destroy({ where: {} });
    await Promise.all(
      employees.map((employee) =>
        chai.request(server).post('/employees').set('content-type', 'application/json').send(employee)
      )
    );
  });

  after(() => {
    Employee.destroy({ where: {} });
  });

  it('Quando são requisitados todos os trabalhadores"employees" em um relatorio de salario', async () => {
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

    const loginRequest = await chai.request(server).post('/employees/login').send(defaultEmployee);

    token = loginRequest.body.token;

    response = await chai.request(server).get('/reports/employees/salary/').set('authorization', token);

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
