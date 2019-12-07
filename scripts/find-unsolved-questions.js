#!/usr/bin/env node

const { connect, search } = require('./database');

const collection = 'Questions';
const query = { solution: null };

(async function() {
  try {
    const { mongo, db } = await connect();
    const unsolved = await search(db, collection, query);
    for (question of unsolved) {
        const { questionId, titleSlug, categoryTitle } = question;
        console.log(`${questionId}|${titleSlug}|${categoryTitle}`);
    }
    mongo.close();
  } catch (err) {
    console.error(err);
  }
})()
