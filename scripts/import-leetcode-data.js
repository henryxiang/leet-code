#!/usr/bin/env node

const { connect, save, findById } = require('./database');
const { getTopics, getAllQuestions, getQuestionDetails } = require('./service');

const collection = {
  question: 'Questions',
  topic: 'Topics',
};

async function importTopics (db) {
  try {
    const topics = await getTopics();
    for (const topic of topics) {
      // const saved = await findById(db, collection.topic, topic.slug);
      // if (saved) continue;
      topic._id = topic.slug;
      const result = await save(db, collection.topic, topic);
      if (result) {
        console.log(`Imported Topic: ${topic.name}`);
      } else {
        console.error(`Topic Importing Error: ${topic.name}`);
      }
    }
  } catch (err) {
    console.error(err);
  }
}

async function importQuestions (db) {
  try {
    const questions = await getAllQuestions();
    for (const question of questions) {
      const { titleSlug } = question;
      const saved = await findById(db, collection.question, titleSlug);
      if (saved && saved.solution) continue;
      const details = await getQuestionDetails(titleSlug);
      const doc = { _id: titleSlug, ...question, ...details };
      const result = await save(db, collection.question, doc);
      if (result) {
        console.log(`Imported Question: (${doc.questionId}) ${doc.title}`);
      } else {
        console.error(`Question Importing Error: ${titleSlug}`);
      }
    }
  } catch (err) {
    console.error(err);
  }
}

(async function() {
  const { mongo, db } = await connect();
  await importTopics(db);
  await importQuestions(db);
  mongo.close();
})()
