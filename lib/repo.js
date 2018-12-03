const { MongoClient } = require('mongodb');

const createClient = async (hostname, dbName) => {
  try {
    const client = await MongoClient.connect(hostname, { useNewUrlParser: true });
    return Object.assign(client, { dbName });
  } catch (error) {
    console.error('An error occurred connecting to MongoDB: ', error);
    throw new Error(error);
  }
};

const insert = async (client, collectionName, object) => {
  const db = client.db(client.dbName);
  const collection = db.collection(collectionName);

  try {
    return await collection.insertOne(object);
  } catch (error) {
    console.error(error);
    throw new Error(error);    
  }
};

const get = async (client, collectionName, filter) => {
  const db = client.db(client.dbName);
  const collection = db.collection(collectionName);

  return await collection.find(filter).toArray().reverse();
};

module.exports = { createClient, insert, get };