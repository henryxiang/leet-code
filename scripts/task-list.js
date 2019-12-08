#!/usr/bin/env node

const { connect, search } = require('./database');

const difficulty = ['Easy', 'Medium', 'Hard'];
const collection = 'Questions';
const query = { categoryTitle: 'Algorithms'};
// const baseUrl = 'https://leetcode.com/problems';
const baseUrl = './questions/';

(async function() {
  try {
    const { mongo, db } = await connect();
    console.log('# LeetCode Coding Problems (Algorithms)\n');
    for (const level of difficulty) {
      console.log('---\n');
      console.log(`## ${level} Questions\n`);
      query.difficulty = level;
      const questions = await search(db, collection, query);
      for (let question of questions) {
          const { questionId, title, titleSlug, topicTags } = question;
          const topics = topicTags ? topicTags.map(t => t.name).join(', ') : 'Others';
          console.log(`- [ ] [${questionId}. ${title}](${baseUrl}/${questionId}.md) (${topics}) [Solution](./solutions/${questionId}.md)`);
      }
    }
    mongo.close();
  } catch (err) {
    console.error(err);
  }
})()
