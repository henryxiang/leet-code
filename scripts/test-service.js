#!/usr/bin/env node

const service = require('./service');

const runTest = async (method, args) => {
  const results = await service[method](...args)
  console.log(JSON.stringify(results, null, 2));
}

const main = async () => {
  const test = process.argv[2];
  const args = process.argv.length > 3 ? process.argv.slice(3) : [];
  if (!test) {
    console.error('Missing method to be tested.');
    process.exit(1);
  }
  runTest(test, args);
}

main();
