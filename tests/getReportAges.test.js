const chai = require('chai');
const chaiHttp = require('chai-http');
const { generateNEmployees } = require('../src/utils');
const { Employee } = require('../src/database/models');
const moment = require('moment');
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

const employee = {
  name: 'Anakin Skywalker',
  department: 'Architecture',
  email: 'skywalker@ssys.com.br',
  password: 'beStrong',
  salary: '4000.00',
  birth_date: '01-01-1983',
};

describe('GET /reports/employees/age/ (age report)', () => {
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

  it('Quando são requisitados todos os trabalhadores"employees" em um relatorio de idade', async () => {
    const loginRequest = await chai.request(server).post('/employees/login').send(employee);

    token = loginRequest.body.token;

    const buildReport = (employees) => {
      const report = {};
      const ages = employees.map((employee) => moment(moment(employee.birth_date, 'DD-MM-YYYY').format('YYYY-MM-DD')));
      let older = moment.min(ages);
      let younger = moment.max(ages);

      employees.forEach((employee) => {
        if (employee.birth_date == moment(younger).format('DD-MM-YYYY')) {
          report.younger = employee;
        }

        if (employee.birth_date == moment(older).format('DD-MM-YYYY')) {
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

    response = await chai.request(server).get('/reports/employees/age/').set('authorization', token);

    expect(response.status).to.be.equal(200);
    expect(response.body).to.not.be.equal({});

    Object.keys(response.body).forEach((key) => {
      Object.keys(response.body[key]).forEach((employeeKeys) => {
        if (employeeKeys === 'id') return expect(response.body[key][employeeKeys]).to.not.be.equal('');
        expect(response.body[key][employeeKeys]).to.be.equal(report[key][employeeKeys]);
      });
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

  it('Não será possivel fazer o report caso não existam usuários', async () => {
    const loginRequest = await chai.request(server).post('/employees/login').send(employee);

    token = loginRequest.body.token;

    Employee.destroy({ where: {} });

    response = await chai.request(server).get('/reports/employees/age/').set('authorization', token);

    expect(response.status).to.be.equal(404);
    expect(response.body).to.be.deep.equal({ message: 'Employees not found' });
  });
});
