#!/usr/bin/env node

const fetch = require('node-fetch');

const url = 'https://leetcode.com/problems/api/tags';

(async function() {
  const res = await fetch(url);
  const { topics } = await res.json();
  topics.forEach(t => {
    t._id = t.slug;
    console.log(JSON.stringify(t));
  });
})()
