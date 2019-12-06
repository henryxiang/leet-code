#!/usr/bin/env node

const axios = require('axios').default;

const url = 'https://leetcode.com/problems/api/tags';

(async function() {
  const res = await axios.get(url);
  const { topics } = res.data;
  topics.forEach(t => {
    t._id = t.slug;
    console.log(JSON.stringify(t));
  });
})()
