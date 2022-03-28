const { MongoClient } = require('mongodb');
const { MongoMemoryServer } = require('mongodb-memory-server');


const connection = async () => {

  const DBServer = await MongoMemoryServer.create();
  const URLMock = await DBServer.getUri();

  return MongoClient.connect(URLMock, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
}

module.exports = connection;