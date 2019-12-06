const allQuestions = {
	"operationName": 'allQuestions',
	"variables": {},
	"query": `query allQuestions {
			allQuestions {
				...questionSummaryFields
			}
		}
		fragment questionSummaryFields on QuestionNode {
			title
			titleSlug
			translatedTitle
			questionId
			questionFrontendId
			status
			difficulty
			isPaidOnly
			categoryTitle
	}`
};
const question = {
  operationName: 'questionData',
  variables: { titleSlug: '' },
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
const article = {
  operationName: 'QuestionNote',
  variables: {titleSlug: ''},
  // variables: {titleSlug: 'coin-change-2'},
  query: `query QuestionNote($titleSlug: String!) {
	  question(titleSlug: $titleSlug) {
	    questionId
	    article
	    solution {
	      id
	      url
	      content
	      contentTypeId
	      canSeeDetail
	      rating {
	        id
	        count
	        average
	        userRating {
	          score
	          __typename
	        }
	        __typename
	      }
	      __typename
	    }
	    __typename
	  }
  }`
};

module.exports = { allQuestions, question, article }
