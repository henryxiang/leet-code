#!/usr/bin/env node

const MongoClient = require('mongodb').MongoClient;
const fetch = require('node-fetch');
const headers = require('./headers');
const { allQuestions, question, solution } = require('./lc-graphql');

const titleSlug = process.argv[2];
const url = 'https://leetcode.com/graphql';
const options = {
  headers,
  method: 'POST',
  body: null,
  mode: 'cors',
  referrer: 'https://leetcode.com/',
  referrerPolicy: 'no-referrer-when-downgrade',
};
const mongoConfig = {
  url: 'mongodb://localhost:27017',
  database: 'LeetCode',
  collection: 'Questions',
  option: { useUnifiedTopology: true },
};


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
    return json.data.question;
  } catch (err) {
    console.error(titleSlug, err);
    return null;
  }
}

async function getQuestionDetails(titleSlug) {
  let doc = {};
  const desc = await getQuestionDescription(titleSlug);
  doc = { ...doc, ...desc };
  if (doc.solution) {
    const solution = getQuestionSolution(titleSlug);
    doc = { ...doc, ...solution };
  }
  return doc;
}

(async function() {
  if (!titleSlug) {
    console.error("Missing titleSlug");
    process.exit(1);
  }
  try {
    const mongo = await MongoClient.connect(mongoConfig.url, mongoConfig.option);
    console.info("Connected to MongoDB");
    const db = mongo.db(mongoConfig.database);
    const doc = await getQuestionDetails(titleSlug);
    await db.collection(mongoConfig.collection).updateOne(
      { _id: titleSlug},
      { $set: doc },
      { upsert: true },
    );
    console.log(JSON.stringify(doc, null, 2));
    mongo.close();
  } catch (err) {
    console.error(err);
  }
})()
