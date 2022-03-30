require('dotenv').config();

const options = {
  host: `${process.env.DATABASE_HOST || 'mysql'}`,
  port: process.env.DATABASE_PORT || '3306',
  username: process.env.DATABASE_USER || 'root',
  password: process.env.DATABASE_PASSWORD || 'root',
  database: process.env.DATABASE_NAME || 'SSYS',
  dialect: process.env.DATABASE_DIALECT || 'mysql',
  dialectOptions: {
    timezone: 'Z',
  },
  logging: false,
};

module.exports = {
  development: {
    ...options,
  },
  test: {
    ...options,
  },
  production: {
    ...options,
  },
};
