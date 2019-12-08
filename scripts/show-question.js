#!/usr/bin/env node

const Entities = require('html-entities').AllHtmlEntities;
const { connect, search } = require('./database');

const id = process.argv[2];
const showSolution = process.argv[3];
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
      const { questionId, title, categoryTitle, difficulty, topicTags, content, solution } = question;
      const topics = topicTags ? topicTags.map(t => t.name).join(', ') : 'Others';
      console.log(`#${questionId}. ${title} | ${categoryTitle} | ${difficulty} | ${topics}\n`);
      console.log(`Category: ${categoryTitle}`);
      console.log(`Difficulty: ${difficulty}`);
      console.log(`Tags: ${topics}\n`);
      if (content) console.log(decodeEntities(content.replace(/<.+?>/g, '')));
      if (showSolution && solution && solution.content) {
        console.log(decodeEntities(solution.content.replace(/<.+?>/g, '')));
      }
    }
    mongo.close();
  } catch (err) {
    console.error(err);
  }
})()
