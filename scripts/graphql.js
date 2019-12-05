#!/usr/bin/env node

const axios = require('axios').default;

const url = 'https://leetcode.com/graphql';
const data = {
  operationName: 'questionData',
  variables: { titleSlug: 'two-sum'},
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
    }`,
  };

(async function() {
  const res = await axios.post(url, data);
  console.log(res.data);
})()
