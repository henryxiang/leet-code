#!/usr/bin/env node

const { connect, search } = require('./database');

const collection = 'Questions';
const query = { solution: null };

(async function() {
  try {
    const { mongo, db } = await connect();
    const unsolved = await search(db, collection, query);
    for (let question of unsolved) {
        const { questionId, titleSlug, categoryTitle, difficulty } = question;
        console.log(`${questionId}|${titleSlug}|${categoryTitle}|${difficulty}`);
    }
    mongo.close();
  } catch (err) {
    console.error(err);
  }
})()
