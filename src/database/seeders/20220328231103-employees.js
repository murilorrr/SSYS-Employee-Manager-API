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
        {
          name: 'Fulana Pereira',
          email: 'fulana@deliveryapp.com',
          password:
            '$2a$07$UL9JWiVenZ1ZISx/cXv6ge0iDjoPzqpFA/IQm5sWrz6SG/ghrOkUO',
          role: 'seller',
        },
        {
          name: 'Cliente Zé Birita',
          email: 'zebirita@email.com',
          password:
            '$2a$07$SFj3bfAXCjX..BLf1ZzG7OYQQ8SQinm4E7.IpxI2Dfcvypig3zRsi',
          role: 'customer',
        },
      ],
      { timestamps: false }
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('users', null, {});
  },
};
