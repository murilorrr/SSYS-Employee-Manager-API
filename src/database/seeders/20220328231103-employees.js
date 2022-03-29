'use strict';
const { generateNEmployees } = require('../../../utils');
const { encryptPassword } = require('../../../utils');
const employees = generateNEmployees(Math.ceil(Math.random() * 99));

const defaultEmployee = {
  name: 'Anakin Skywalker',
  department: 'Architecture',
  email: 'skywalker@ssys.com.br',
  password: 'beStrong',
  salary: '4000.00',
  birth_date: '01-01-1983',
};

const seeders = [defaultEmployee, ...employees];
seeders.forEach((employee) => {
  employee.password = encryptPassword(employee.password);
});

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Employees', seeders, { timestamps: false });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('users', null, {});
  },
};
