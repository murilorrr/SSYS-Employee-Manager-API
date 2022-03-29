'use strict';
const { generateNEmployees } = require('../../../utils');
const employees = generateNEmployees(Math.ceil(Math.random() * 99));

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Employees', employees, { timestamps: false });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('users', null, {});
  },
};
