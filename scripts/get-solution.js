#!/usr/bin/env node

const fetch = require('node-fetch');
const headers = require('./headers');
const { solution } = require('./lc-graphql');

const titleSlug = process.argv[2] || 'two-sum';
const url = 'https://leetcode.com/graphql';
const data = solution;
data.variables.titleSlug = titleSlug;

const options = {
  headers,
  method: 'POST',
  body: JSON.stringify(data),
  mode: 'cors',
  referrer: 'https://leetcode.com/',
  referrerPolicy: 'no-referrer-when-downgrade',
};

(async function() {
  const res = await fetch(url, options);
  const json = await res.json();
  console.log(json.data.question);
})()
