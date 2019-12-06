#!/usr/bin/env node

const path = require('path');
const { CookieMap } = require('cookiefile');

function decodeEntities(encodedString) {
  const translate_re = /&(nbsp|amp|quot|lt|gt);/g;
  const translate = {
      'nbsp': ' ',
      'amp' : '&',
      'quot': '"',
      'lt'  : '<',
      'gt'  : '>'
  };
  return encodedString.replace(translate_re, function(match, entity) {
      return translate[entity];
  }).replace(/&#(\d+);/gi, function(match, numStr) {
      var num = parseInt(numStr, 10);
      return String.fromCharCode(num);
  });
}

function getCookies() {
  const cookieJar = new CookieMap(path.join(__dirname, 'cookies.txt'));
  const cookies = []
  cookieJar.forEach(c => {
    if (c.domain === 'leetcode.com' || c.domain === '.leetcode.com')
      cookies.push(`${c.cookieName}=${decodeEntities(c.value)}`);
  });
  return cookies;
}

// console.log(getCookies().join('; '));

module.exports = { getCookies }
