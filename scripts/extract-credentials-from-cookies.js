#!/usr/bin/env node

const path = require('path');
const { CookieMap } = require('cookiefile');

const cookieFile = process.argv[2] || path.join(__dirname, '..', 'cookies.txt');
const credentials = {
    'csrftoken': 'TOKEN',
    'LEETCODE_SESSION': 'SESSION',
};

const cookieJar = new CookieMap(cookieFile);
cookieJar.forEach(cookie => {
    const { cookieName, value } = cookie;
    if (credentials[cookieName]) {
        console.log(`${credentials[cookieName]}=${value}`);
    }
});
