#!/usr/bin/env node

const { getTopics } = require('./service');

(async function() {
  const topics = await getTopics();
  topics.forEach(t => {
    t._id = t.slug;
    console.log(JSON.stringify(t));
  });
})()
