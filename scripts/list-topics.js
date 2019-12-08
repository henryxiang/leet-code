#!/usr/bin/env node

const { connect, search } = require('./database');

const collection = 'Topics';
const query = {};

(async function() {

  try {
    const { mongo, db } = await connect();
    const topics = await search(db, collection, query);
    for (let topic of topics) {
        const { name, slug, questions } = topic;
        console.log(`${slug}|${name}|${questions.length}`);
        console.log(`>${slug}|${questions.join(',')}`);
    }
    mongo.close();
  } catch (err) {
    console.error(err);
  }
})()
