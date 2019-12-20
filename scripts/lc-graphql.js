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
			categoryTitle
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
const allCards = {
	operationName: 'GetCategories',
	variables: {
    categorySlug: 'interview',
	},
	query: `
	query GetCategories($categorySlug: String, $num: Int) {
	  categories(slug: $categorySlug) {
	    id
	    title
	    slug
	    cards(num: $num) {
	      ...CardDetailFragment
	    }
	  }
	  mostRecentCard {
	    ...CardDetailFragment
	    progress
	  }
	  allProgress
	}
	fragment CardDetailFragment on CardNode {
	  id
	  img
	  title
	  slug
	  categorySlug
	  description
	  createdAt
	  lastModified
	  paidOnly
	  published
	  numChapters
	  numItems
	}`
};
const chapters = {
	operationName: 'GetChapters',
	variables: {
		cardSlug: '',
	},
	query: `
	query GetChapters($cardSlug: String!) {
	  chapters(cardSlug: $cardSlug) {
	    descriptionText
	    id
	    title
	    slug
	  }
	}`
};
const chapter = {
	operationName: 'GetChapter',
	variables: {
		chapterId: '',
		cardSlug: 'foo',
	},
	query: `
	query GetChapter($chapterId: String, $cardSlug: String) {
	  chapter(chapterId: $chapterId, cardSlug: $cardSlug) {
	    ...ExtendedChapterDetail
	    description
	  }
	}
	fragment ExtendedChapterDetail on ChapterNode {
	  id
	  title
	  slug
	  items {
	    id
      title
	    type
	    info
	    paidOnly
	    chapterId
	    prerequisites {
	      id
	      chapterId
      }
      question {
	      questionId
	      title
        titleSlug
			}
			article {
				id
				title
			}
			htmlArticle {
				id
				html
			}
			video {
				id
			}
			webPage {
				id
			}
	  }
	}`
};

module.exports = { allQuestions, question, solution, allCards, chapter, chapters }
