// const { ObjectId } = require('mongodb');
const connection = require('./connection');

const createOne = async (collection, entity) => {
  try {
    const result = await connection()
      .then((db) => db.collection(collection)
        .insertOne(entity));
    return result.ops.pop() || null;
  } catch (error) {
    return error.message;
  }
};

const getOneByEmail = async (collection, email) => {
  try {
    const result = await connection()
      .then((db) => db.collection(collection)
        .find({ email }).toArray());
    return result.length > 0 ? result : null;
  } catch (error) {
    return error.message;
  }
};

module.exports = (collection) => ({
  createOne: (entity) => createOne(collection, entity),
  getOneByEmail: (email) => getOneByEmail(collection, email),
});
