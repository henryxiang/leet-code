#!/usr/bin/env node

const { getQuestionDetails } = require('./service');

const titleSlug = process.argv[2];

(async function() {
  if (!titleSlug) {
    console.error("Missing titleSlug");
    process.exit(1);
  }
  const doc = await getQuestionDetails(titleSlug);
  doc._id = titleSlug;
  console.log(JSON.stringify(doc, null, 2));
})()
