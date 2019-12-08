#!/usr/bin/env node

const { connect, search } = require('./database');

const collection = 'Questions';
const query = {};

(async function() {

  try {
    const { mongo, db } = await connect();
    const questions = await search(db, collection, query);
    for (let question of questions) {
        const { questionId, title, categoryTitle, difficulty, topicTags } = question;
        const topics = topicTags ? topicTags.map(t => t.name).join(', ') : 'Others';
        console.log(`${questionId}|${title}|${categoryTitle}|${difficulty}|${topics}`);
    }
    mongo.close();
  } catch (err) {
    console.error(err);
  }
})()
