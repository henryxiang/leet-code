require('dotenv').config();

const { TOKEN, SESSION } = process.env;
const cookies = {
  '__cfduid': 'd922a8f7ccc89f29f69e5889a5e1875ca1574708850',
  '_ga': 'GA1.2.815432614.1574708857',
  '__stripe_mid': '233b6606-dd24-4f32-84cd-6af0ae22aeec',
  '__atuvc': '3%7C49',
  '_gid': 'GA1.2.1989788763.1575582766',
  'csrftoken': TOKEN,
  'LEETCODE_SESSION': SESSION,
  '_gat': '1',
  'c_a_u': 'aGVucnl4aWFuZw==:1id4mr:WGlvwdwNs27vTPZxfN_RAtJt56I',
};

module.exports = {
  'accept': '*/*',
  'accept-language': 'en-US,en;q=0.9,zh-CN;q=0.8,zh;q=0.7,zh-TW;q=0.6',
  'cache-control': 'no-cache',
  'content-type': 'application/json',
  'pragma': 'no-cache',
  'sec-fetch-mode': 'cors',
  'sec-fetch-site': 'same-origin',
  'x-csrftoken': TOKEN,
  'x-newrelic-id': 'UAQDVFVRGwEAXVlbBAg=',
  'cookie': Object.keys(cookies).map(k => `${k}=${cookies[k]}`).join('; '),
};
