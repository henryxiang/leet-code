#!/usr/bin/env node

const { connect, save } = require('./database');
const { getQuestionDetails } = require('./service');

const titleSlug = process.argv[2];
const collection = 'Questions';

(async function() {
  if (!titleSlug) {
    console.error("Missing titleSlug");
    process.exit(1);
  }
  try {
    const { mongo, db } = await connect();
    const doc = await getQuestionDetails(titleSlug);
    doc._id = titleSlug;
    const result = await save(db, collection, doc);
    if (result) {
      console.log(`Imported Question: (${doc.questionId}) ${doc.title}`);
    } else {
      console.error(`Importing Error: ${titleSlug}`);
    }
    mongo.close();
  } catch (err) {
    console.error(err);
  }
})()
