#!/usr/bin/env node

const fetch = require('node-fetch');
const headers = require('./headers');
const { allQuestions } = require('./lc-graphql');

const url = 'https://leetcode.com/graphql';

const options = {
  headers,
  method: 'POST',
  body: JSON.stringify(allQuestions),
  mode: 'cors',
  referrer: 'https://leetcode.com/',
  referrerPolicy: 'no-referrer-when-downgrade',
};

(async function() {
  const res = await fetch(url, options);
  const json = await res.json();
  json.data.allQuestions.forEach(q => {
    q._id = q.titleSlug;
    console.log(JSON.stringify(q));
  });
})()
