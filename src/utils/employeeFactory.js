const moment = require('moment');
const { faker } = require('@faker-js/faker');

const employeeFactory = () => {
  let randomName = '';
  const minNameLength = 6;
  while (randomName.length < minNameLength) {
    randomName = faker.name.findName();
  }

  const email = faker.internet.email();

  const passwordLength = 6;
  const password = faker.random.alphaNumeric(passwordLength);

  let department;
  department = faker.commerce.department();
  while (department.length < 3) {
    department = faker.commerce.department();
  }

  const salary = String(faker.datatype.number({ min: 10000 }) + '.00');

  const date = faker.date.past(100).toISOString();

  const birth_date = moment(date).format('DD-MM-YYYY');

  const fakeEmployee = { name: randomName, email, password, department, salary, birth_date };

  return fakeEmployee;

};

module.exports = employeeFactory;
