#!/usr/bin/env node

const { connect, search } = require('./database');

const difficulty = ['', 'Easy', 'Medium', 'Hard'];
const topic = process.argv[2];
const level = process.argv[3]
const collection = 'Questions';
const query = {
  topicTags: { $elemMatch: { slug: topic } },
};
if (level) {
  query.difficulty = difficulty[level];
}

(async function() {
  if (!topic) {
    console.error('Missing topic');
    process.exit(1);
  }
  try {
    const { mongo, db } = await connect();
    let questions = [];
    if (level) {
      questions = await search(db, collection, query);
    } else {
      for (const d of difficulty.slice(1, difficulty.length)) {
        query.difficulty = d;
        const results = await search(db, collection, query);
        questions = [...questions, ...results];
      }
    }

    for (let question of questions) {
      const { questionId, titleSlug, difficulty } = question;
      console.log(`${questionId}|${titleSlug}|${difficulty}`);
    }
    mongo.close();
  } catch (err) {
    console.error(err);
  }
})()
