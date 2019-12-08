#!/usr/bin/env node

const Entities = require('html-entities').AllHtmlEntities;
const { connect, search } = require('./database');

const id = process.argv[2];
const collection = 'Questions';
const query = {
  questionId: id,
};

function decodeEntities(encodedString) {
  return (new Entities).decode(encodedString);
}

(async function() {
  if (!id) {
    console.error("Missing search id.");
    process.exit(1);
  }
  try {
    const { mongo, db } = await connect();
    const questions = await search(db, collection, query);
    for (let question of questions) {
      const { questionId, title, categoryTitle, difficulty, topicTags, content } = question;
      const topics = topicTags ? topicTags.map(t => t.name).join(', ') : 'Others';
      console.log(`${questionId}. ${title} | ${categoryTitle} | ${difficulty} | ${topics}\n`);
      console.log(decodeEntities(content.replace(/<.+?>/g, '')));
    }
    mongo.close();
  } catch (err) {
    console.error(err);
  }
})()
