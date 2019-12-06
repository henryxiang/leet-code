#!/usr/bin/env node

const fetch = require('node-fetch');
const headers = require('./headers');
const { question } = require('./lc-graphql');

const titleSlug = process.argv[2] || 'missing-ranges';
const url = 'https://leetcode.com/graphql';
const data = question;
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
