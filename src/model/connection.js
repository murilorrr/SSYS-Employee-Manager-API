const { MongoClient } = require('mongodb');
require('dotenv').config();

const MONGO_DB_URL = process.env.ATLAS_URL || `mongodb://${process.env.HOST || 'mongodb'}:27017`;
const dbName = process.env.DBNAME;

const connection = () => MongoClient.connect(MONGO_DB_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then((conn) => conn.db(dbName))
  .catch(() => {
    process.exit();
  });

module.exports = connection;
