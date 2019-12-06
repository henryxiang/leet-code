#!/usr/bin/env node

const axios = require('axios').default;
const { getCookies } = require('./cookie-jar');
const { question, article } = require('./lc-graphql');

const csrfToken = 'qrv590xBMJwxQQNtj3ZvUCFTSHHjIeJlesPxozyzCHyckI1cREla4XGEhidRJqN1';
// const titleSlug = 'two-sum';
const titleSlug = 'missing-ranges';
const url = 'https://leetcode.com/graphql';
const data = question;
data.variables.titleSlug = titleSlug;
const cookies = getCookies();
const options = {
  withCredentials: true,
  xsrfCookieName: 'csrftoken',
  xsrfHeaderName: 'x-csrftoken',
  headers: { 
    'cookie': cookies.join(', '),
    'authority': 'leetcode.com',
    'pragma': 'no-cache',
    'cache-control': 'no-cache',
    'accept': '*/*',
    'x-newrelic-id': 'UAQDVFVRGwEAXVlbBAg=',
    'origin': 'https://leetcode.com',
    'x-csrftoken': csrfToken,
    'user-agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/78.0.3904.108 Safari/537.36',
    'content-type': 'application/json',
    'sec-fetch-site': 'same-origin',
    'sec-fetch-mode': 'cors',
    'referer': 'https://leetcode.com/problems/container-with-most-water/',
    'accept-language': 'en-US,en;q=0.9,zh-CN;q=0.8,zh;q=0.7,zh-TW;q=0.6',
  },
};
console.log(cookies.join(', '));

(async function() {
  const res = await axios.post(url, data, options);
  const { content, solution } = res.data.data.question;
  console.log(content);
  console.log(solution);
})()
