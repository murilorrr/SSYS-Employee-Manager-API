const chai = require("chai");
const chaiHttp = require("chai-http");
const { MongoClient } = require('mongodb');
const connectionMock = require('../utils/connectionMock');
const dbName = process.env.DBNAME;
const sinon = require('sinon');
const moment = require('moment');
const { faker } = require('@faker-js/faker');

chai.use(chaiHttp);

const server = require("../src/server/app");
const { it } = require("mocha");

const { expect } = chai;

// name: Joi.string().min(3).required(),
//   department: Joi.string().min(3).required(),
//   email: Joi.string().email().required(),
//   salary: Joi.string().min(6).required(),
//   password: Joi.string().min(6).required(),
//   birth_date: Joi.string().required(),

const employeeFactory = () => {
  let randomName = '';
  const minNameLength = 6;
  while (randomName.length < minNameLength) {
    randomName = faker.name.findName();
  }

  const email = faker.internet.email();

  const passwordLength = 6;
  const password = faker.random.alphaNumeric(passwordLength);

  const departament = faker.commerce.department();

  const salary = String(faker.datatype.number({ min: 10000 }) + '.00');

  const date = faker.date.past(100).toISOString();

  const birth_date = moment(date).format('DD-MM-YYYY');

  const fakeEmployee = { name: randomName, email, password, departament, salary, birth_date };

  return fakeEmployee;

};

const createEmployeesInDataBase = (employees) => {
  employees.forEach(async(employee) => {
    await chai.request(server)
        .post('/employees')
        .set('content-type', 'application/json')
        .send(employee)
  });
};

describe.only('GET /employees', () => {
  let connection;
  let response;
  let db;

  const generateNEmployees = (numberOfEmployees) => {
    arrayOfEmployees = [];
    for (let index = 0; index < numberOfEmployees; index++) {
      arrayOfEmployees.push(employeeFactory());
    }
    return arrayOfEmployees;
  }

  const randomNumberOfEmployeesMaxEleven = Math.ceil(Math.random() * 10);
  const employees = generateNEmployees(randomNumberOfEmployeesMaxEleven);

  before( async () => {
    connection = await connectionMock();

    sinon.stub(MongoClient, 'connect')
      .resolves(connection);
    
    db = connection.db(dbName);
  });

  it('Quando são requisitados todos os trabalhadores"employees"', async () => {

    createEmployeesInDataBase(employees);

    response = await chai.request(server)
        .get('/employees')

    console.table(employees);
    expect(response.body.employees).to.be.deep.equal(employees);

  });
});