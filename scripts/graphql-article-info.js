#!/usr/bin/env node

const axios = require('axios').default;
const { question, article } = require('./lc-graphql');

const titleSlug = 'two-sum';
// const titleSlug = 'missing-ranges';
const url = 'https://leetcode.com/graphql';
const data = article;
data.variables.titleSlug = titleSlug;

(async function() {
  console.log(JSON.stringify(data));
  // const res = await axios.post(url, data);
  // console.log(res.data);
  // const { content, solution } = res.data.data.question;
  // console.log(content);
  // console.log(solution);
})()
