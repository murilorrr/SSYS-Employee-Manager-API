'use strict';

// "name": "Anakin Skywalker",
//   "department": "Architecture",
//   "email": "skywalker@ssys.com.br",
//   "password": "beStrong",
//   "salary": "4000.00",
//   "birth_date": "01-01-1983"

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      'employees',
      [
        {
          name: 'Anakin Skywalker',
          department: 'Architecture',
          email: 'skywalker@ssys.com.br',
          password: 'beStrong',
          salary: '4000.00',
          birth_date: '01-01-1983',
        },
      ],
      { timestamps: false }
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('users', null, {});
  },
};
