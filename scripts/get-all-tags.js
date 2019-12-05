#!/usr/bin/env node

const axios = require('axios').default;

const url = 'https://leetcode.com/problems/api/tags';

(async function() {
  const res = await axios.get(url);
  const { topics } = res.data;
  console.log(JSON.stringify(topics, null, 2));
  // topics.forEach(t => {
  //   console.log(t.name, t.slug, t.questions.length);
  // });
})()
