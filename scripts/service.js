const fetch = require('node-fetch');
const headers = require('./headers');
const { allQuestions, question, solution } = require('./lc-graphql');

const url = 'https://leetcode.com/graphql';
const options = {
  headers,
  method: 'POST',
  body: null,
  mode: 'cors',
  referrer: 'https://leetcode.com/',
  referrerPolicy: 'no-referrer-when-downgrade',
};

async function getTopics() {
  const tagUrl = 'https://leetcode.com/problems/api/tags';

  try {
    const res = await fetch(tagUrl);
    if (!res.ok) {
      console.error(res.status, res.statusText);
      return [];
    }
    const { topics } = await res.json();
    topics.forEach(t => {
      t._id = t.slug;
    });
    return topics;
  } catch (err) {
    console.error(err);
    return [];
  }
}

async function getAllQuestions() {
  try {
    options.body = JSON.stringify(allQuestions);
    const res = await fetch(url, options);
    if (!res.ok) {
      console.error(res.status, res.statusText);
      return [];
    }
    const json = await res.json();
    return json.data.allQuestions;
  } catch (err) {
    console.error(err);
    return [];
  }
}

async function getQuestionDescription(titleSlug) {
  try {
    question.variables.titleSlug = titleSlug;
    options.body = JSON.stringify(question);
    const res = await fetch(url, options);
    if (!res.ok) {
      console.error(res.status, res.statusText);
      return null;
    }
    const json = await res.json();
    return json.data.question;
  } catch (err) {
    console.error(titleSlug, err);
    return null;
  }
}

async function getQuestionSolution(titleSlug) {
  try {
    solution.variables.titleSlug = titleSlug;
    options.body = JSON.stringify(solution);
    const res = await fetch(url, options);
    if (!res.ok) {
      console.error(res.status, res.statusText);
      return null;
    }
    const json = await res.json();
    return json.data.question.solution;
  } catch (err) {
    console.error(titleSlug, err);
    return null;
  }
}

async function getQuestionDetails(titleSlug) {
  const doc = await getQuestionDescription(titleSlug);
  if (!doc) return ({});
  const solution = await getQuestionSolution(titleSlug);
  if (solution) doc.solution = { ...doc.solution, ...solution };
  return doc;
}

module.exports = {
  getAllQuestions,
  getQuestionDetails,
  getQuestionDescription,
  getQuestionSolution,
  getTopics,
}
