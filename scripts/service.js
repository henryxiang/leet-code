const fetch = require('node-fetch');
const headers = require('./headers');
const { allQuestions, question, solution, allCards, chapter, chapters }
= require('./lc-graphql');

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
    // console.debug(res);
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

async function getQuestionById(questionId) {
  const questions = await getAllQuestions();
  for (const q of questions) {
    if (q.questionId === questionId) {
      return await getQuestionDescription(q.titleSlug);
    }
  }
  return null;
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

async function getAllCards(category = null) {
  try {
    allCards.variables.categorySlug = category;
    options.body = JSON.stringify(allCards);
    const res = await fetch(url, options);
    // console.debug(res);
    if (!res.ok) {
      console.error(res.status, res.statusText);
      return [];
    }
    const json = await res.json();
    const ids = {};
    const cards = [];
    for (const cat of json.data.categories) {
      for (const card of cat.cards) {
        if (ids[card.id]) continue;
        cards.push(card);
        ids[card.id] = 1;
      }
    }
    cards.sort((a, b) =>
      `${a.categorySlug}:${a.createdAt}` > `${b.categorySlug}:${b.createdAt}` ? 1 : -1);
    return cards;
  } catch (err) {
    console.error(err);
    return [];
  }
}

async function getCardChapters(cardSlug) {
  try {
    chapters.variables.cardSlug = cardSlug;
    options.body = JSON.stringify(chapters);
    const res = await fetch(url, options);
    // console.debug(res);
    if (!res.ok) {
      console.error(res.status, res.statusText);
      return [];
    }
    const json = await res.json();
    return json.data.chapters;
  } catch (error) {
    console.error(error);
    return [];
  }
}

async function getChapter(chapterId) {
  try {
    chapter.variables.chapterId = chapterId;
    options.body = JSON.stringify(chapter);
    const res = await fetch(url, options);
    // console.debug(res);
    if (!res.ok) {
      console.error(res.status, res.statusText);
      return [];
    }
    const json = await res.json();
    return json.data;
  } catch (error) {
    console.error(error);
    return [];
  } 
}

module.exports = {
  getAllQuestions,
  getQuestionById,
  getQuestionDetails,
  getQuestionDescription,
  getQuestionSolution,
  getTopics,
  getAllCards,
  getCardChapters,
  getChapter,
}
