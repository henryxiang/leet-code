const MongoClient = require('mongodb').MongoClient;

const config = {
  url: 'mongodb://localhost:27017',
  database: 'LeetCode',
  option: { useUnifiedTopology: true },
};

async function connect() {
  const mongo = await MongoClient.connect(config.url, config.option);
  const db = mongo.db(config.database);
  // console.info(`Connected to MongoDB: ${config.database}`);
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

async function findById(db, collection, id) {
  try{
    return await db.collection(collection).findOne({ _id: id});
  } catch (err) {
    console.error(collection, id, err);
    return null;
  } 
}

async function search(db, collection, query) {
  try{
    const results = []
    const cursor = await db.collection(collection).find(query);
    while (await cursor.hasNext()) results.push(await cursor.next());
    return results;
  } catch (err) {
    console.error(collection, query, err);
    return [];
  }  
}

module.exports = {
  connect,
  save,
  findById,
  search,
}
