#!/bin/bash

base=`dirname $0`

source "$base/.env"

cookie="__cfduid=d922a8f7ccc89f29f69e5889a5e1875ca1574708850; _ga=GA1.2.815432614.1574708857; __stripe_mid=233b6606-dd24-4f32-84cd-6af0ae22aeec; __atuvc=3%7C49; _gid=GA1.2.1989788763.1575582766; csrftoken=$TOKEN; LEETCODE_SESSION=$SESSION; _gat=1; c_a_u=\"aGVucnl4aWFuZw==:1id4mr:WGlvwdwNs27vTPZxfN_RAtJt56I\""
query="{\"operationName\":\"questionData\",\"variables\":{\"titleSlug\":\"$1\"},\"query\":\"query questionData(\$titleSlug: String\u0021) { question(titleSlug: \$titleSlug) { questionId questionFrontendId boundTopicId title titleSlug content translatedTitle translatedContent isPaidOnly difficulty likes dislikes isLiked similarQuestions contributors { username profileUrl avatarUrl __typename } langToValidPlayground topicTags { name slug translatedName __typename } companyTagStats codeSnippets { lang langSlug code __typename } stats hints solution { id canSeeDetail __typename } status sampleTestCase metaData judgerAvailable judgeType mysqlSchemas enableRunCode enableTestMode envInfo libraryUrl __typename }}\"}"

curl -s 'https://leetcode.com/graphql' \
	-H 'authority: leetcode.com' \
	-H 'pragma: no-cache' \
	-H 'cache-control: no-cache' \
	-H 'accept: */*' \
	-H 'x-newrelic-id: UAQDVFVRGwEAXVlbBAg=' \
	-H 'origin: https://leetcode.com' \
	-H 'x-csrftoken: qrv590xBMJwxQQNtj3ZvUCFTSHHjIeJlesPxozyzCHyckI1cREla4XGEhidRJqN1' \
	-H 'user-agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/78.0.3904.108 Safari/537.36' \
	-H 'content-type: application/json' \
	-H 'sec-fetch-site: same-origin' \
	-H 'sec-fetch-mode: cors' \
	-H 'referer: https://leetcode.com/problems/container-with-most-water/' \
	-H 'accept-language: en-US,en;q=0.9,zh-CN;q=0.8,zh;q=0.7,zh-TW;q=0.6' \
	-H "cookie: $cookie" \
	--data "$query" | jq .data.question
