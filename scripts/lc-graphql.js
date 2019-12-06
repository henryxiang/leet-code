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
	  }`,
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
      }
      topicTags {
        name
        slug
      }
      companyTagStats
      codeSnippets {
        lang
        code
      }
      stats
      hints
      solution {
        id
        canSeeDetail
      }
      status
      sampleTestCase
      metaData
      judgerAvailable
      judgeType
      mysqlSchemas
      enableRunCode
      enableTestMode
      libraryUrl
		}
	}`,
};
const solution = {
  operationName: 'QuestionNote',
  variables: {titleSlug: ''},
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
	        }
	      }
	    }
	  }
  }`
};

module.exports = { allQuestions, question, solution }
