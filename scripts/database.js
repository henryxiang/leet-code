const MongoClient = require('mongodb').MongoClient;

const config = {
  url: 'mongodb://localhost:27017',
  database: 'LeetCode',
  option: { useUnifiedTopology: true },
};

async function connect() {
  const mongo = await MongoClient.connect(config.url, config.option);
  const db = mongo.db(config.database);
  console.info(`Connected to MongoDB: ${config.database}`);
  return { mongo, db };
}

async function save(db, collection, doc) {
  try{
    return await db.collection(collection).updateOne(
      { _id: doc._id},
      { $set: doc },
      { upsert: true },
    );
  } catch (err) {
    console.error(doc.titleSlug, err);
    return null;
  } 
}

module.exports = {
  connect,
  save,
}
