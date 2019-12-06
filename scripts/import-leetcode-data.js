#!/usr/bin/env node

const MongoClient = require('mongodb').MongoClient;
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
const mongoConfig = {
  url: 'mongodb://localhost:27017',
  database: 'LeetCode',
  collection: 'Questions',
  option: { useUnifiedTopology: true },
};

async function getAllQuestions() {
  options.body = JSON.stringify(allQuestions);
  const res = await fetch(url, options);
  if (!res.ok) {
    console.error(res.status, res.statusText);
    return [];
  }
  const json = await res.json();
  return json.data.allQuestions;
}

async function getQuestionDescription(q) {
  try {
    question.variables.titleSlug = q.titleSlug;
    options.body = JSON.stringify(question);
    const res = await fetch(url, options);
    if (!res.ok) {
      console.error(res.status, res.statusText);
      return null;
    }
    const json = await res.json();
    return json.data.question;
  } catch (err) {
    console.error(q.titleSlug, err);
    return null;
  }
}

async function getQuestionSolution(q) {
  try {
    solution.variables.titleSlug = q.titleSlug;
    options.body = JSON.stringify(solution);
    const res = await fetch(url, options);
    if (!res.ok) {
      console.error(res.status, res.statusText);
      return null;
    }
    const json = await res.json();
    return json.data.question;
  } catch (err) {
    console.error(q.titleSlug, err);
    return null;
  }
}

async function getQuestionDetails(q) {
  let doc = {...q};
  const desc = await getQuestionDescription(q);
  doc = { ...doc, ...desc };
  if (doc.solution) {
    const solution = getQuestionSolution(q);
    doc = { ...doc, ...solution };
  }
  return doc;
}

(async function() {
  const questions = await getAllQuestions();
  try {
    const mongo = await MongoClient.connect(mongoConfig.url, mongoConfig.option);
    console.info("Connected to MongoDB");
    const db = mongo.db(mongoConfig.database);
    for (const q of questions) {
      const saved = await db.collection(mongoConfig.collection).findOne({_id: q.titleSlug});
      if (saved) {
        if (saved.content && saved.solution) {
          // console.info('Skipped:', saved._id);
          continue;
        }
        const doc = await getQuestionDetails(q);
        if (
            JSON.stringify(saved.content) !== JSON.stringify(doc.content) ||
            JSON.stringify(saved.solution) !== JSON.stringify(doc.solution)
        ) {
          console.info('Updating:', saved._id);
          await db.collection(mongoConfig.collection).updateOne(
            { _id: saved._id },
            { $set: doc },
          );
        }
      } else {
        const doc = await getQuestionDetails(q);
        doc._id = doc.titleSlug;
        console.info('New Question:', doc.title);
        // console.log(doc.content);
        // if (doc.solution) console.log(doc.solution.content);
        await db.collection(mongoConfig.collection).insertOne(doc);
      }
    }
    mongo.close();
  } catch (err) {
    console.error(err);
  }
  
})()
