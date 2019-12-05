#!/usr/bin/env node

const util = require('util');
const axios = require('axios').default;
const config = {
  withCredentials: true
};

const titleSlug = 'two-sum';
// const titleSlug = 'missing-ranges';
const url = 'https://leetcode.com/graphql';
const data = {
  operationName: 'questionData',
  variables: { titleSlug },
  query: `query questionData($titleSlug: String!) {
    question(titleSlug: $titleSlug) {
      questionId
      questionFrontendId
      boundTopicId
      title
      titleSlug
      content
      translatedTitle
      translatedContent
      isPaidOnly
      difficulty
      likes
      dislikes
      isLiked
      similarQuestions
      contributors {
        username
        profileUrl
        avatarUrl
        __typename
      }
      langToValidPlayground
      topicTags {
        name
        slug
        translatedName
        __typename
      }
      companyTagStats
      codeSnippets {
        lang
        langSlug
        code
        __typename
      }
      stats
      hints
      solution {
        id
        canSeeDetail
        __typename
      }
      status
      sampleTestCase
      metaData
      judgerAvailable
      judgeType
      mysqlSchemas
      enableRunCode
      enableTestMode
      envInfo
      libraryUrl
      __typename
      }
    }`
};

const loginUrl = 'https://leetcode.com/accounts/login/';
const loginData = {
  login: 'henryxiang@gmail.com',
  password: 'Rong0829'
};

async function login(credential) {
  const res = await axios.get(loginUrl, config);
  console.log(util.inspect(res));
  // await axios.post(loginUrl, credential, config);
}

(async function() {
  try {
    // await login(loginData);
    const res = await axios.post(url, data);
    console.log(JSON.stringify(res.data.data.question, null, 2));
  } catch (error) {
    console.error(error);
  }
})();
