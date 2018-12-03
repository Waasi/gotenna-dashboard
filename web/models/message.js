const repo = require('../../lib/repo');

const mongoHostname = process.env.MONGO_HOSTNAME;
const dbName = process.env.DB_NAME;

const all = async (filter) => {
  try {
    const client = await repo.createClient(mongoHostname, dbName);
    return await repo.get(client, 'messages', filter);
  } catch (error) {
    return [];
  }
};

const create = async (message) => {
  try {
    const client = await repo.createClient(mongoHostname, dbName);
    return await repo.insert(client, 'messages', message)
  } catch(error) {
    return new Error(error);
  }
};

module.exports = { all, create };