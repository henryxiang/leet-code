#!/usr/bin/env node

const axios = require('axios').default;
const { allQuestions } = require('./lc-graphql');

const url = 'https://leetcode.com/graphql';
const data = allQuestions;

(async function() {
  const res = await axios.post(url, data);
  const questions = res.data.data.allQuestions;
  // console.log(questions.length);
  questions.forEach(q => {
    q._id = q.titleSlug;
    console.log(JSON.stringify(q));
  })
})()
