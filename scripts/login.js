#!/usr/bin/env node

const puppeteer = require('puppeteer');

const loginUrl = 'https://leetcode.com/accounts/login';
const user = 'henryxiang@gmail.com';
const pass = 'Rong0829';

(async () => {
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();
  await page.goto(loginUrl);
  await page.type('input[name="login"]', user);
  await page.type('input[name="password"]', pass);
  await page.type('body', 'Enter');
})()