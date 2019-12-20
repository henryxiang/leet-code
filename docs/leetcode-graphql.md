# LeetCode GraphQL APIs

## Base URL

`https://leetcode.com/graphql`

## Question API

- Get All Questions

```javascript
{
	operationName: 'allQuestions',
	query: `
	query allQuestions {
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
}
```

- Get Question Detail

```javascript
{
	operationName: "getQuestionDetail",
	variables: {
		titleSlug: "two-sum"
	},
	query: `
	query getQuestionDetail($titleSlug: String!) {
	  isCurrentUserAuthenticated
	  question(titleSlug: $titleSlug) {
	    questionId
	    questionFrontendId
	    questionTitle
	    translatedTitle
	    questionTitleSlug
	    content
	    translatedContent
	    difficulty
	    stats
	    allowDiscuss
	    contributors {
	      username
	      profileUrl
	    }
	    similarQuestions
	    mysqlSchemas
	    randomQuestionUrl
	    sessionId
	    categoryTitle
	    submitUrl
	    interpretUrl
	    codeDefinition
	    sampleTestCase
	    enableTestMode
	    metaData
	    langToValidPlayground
	    enableRunCode
	    enableSubmit
	    judgerAvailable
	    infoVerified
	    envInfo
	    urlManager
	    article
	    questionDetailUrl
	    libraryUrl
	    companyTags {
	      name
	      slug
	      translatedName
	    }
	    companyTagStats
	    topicTags {
	      name
	      slug
	      translatedName
	    }
	  }
	  interviewed {
	    interviewedUrl
	    companies {
	      id
	      name
	      slug
	    }
	    timeOptions {
	      id
	      name
	    }
	    stageOptions {
	      id
	      name
	    }
	  }
	  subscribeUrl
	  isPremium
	  loginUrl
	}`
}
```

- Get Question Solution

```javascript
{
  operationName: 'QuestionNote',
  variables: {titleSlug: ''},
  query: `
  query QuestionNote($titleSlug: String!) {
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
}
```

## Explore (Card) API

A `Card` has `Chapters` and each `Chapter` contains `Questions` as items.

- Get All Cards

```javascript
{
	operationName: "GetCategories",
	variables: {
		num: 8
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
}
```

- Get Card Details

```javascript
{
	operationName: "GetCardDetail",
	variables:  {
		cardSlug:  "top-interview-questions-easy"
	},
	query: `
	query GetCardDetail($cardSlug: String!) {
	  card(cardSlug: $cardSlug) {
	    id
	    title
	    slug
	    description
	    banner
	    bannerBackground
	    introduction
	    introText
	    progress
	    paidOnly
	    published
	    isFavorite
	    prevCompleteLinkInfo
	    isPreview
	  }
	  isCurrentUserAuthenticated
	}`
}
```

- Get Chapters from a Card

```javascript
{
	operationName: "GetChapters",
	variables: {
		cardSlug: "top-interview-questions-easy"
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
}
```

- Get Questions from a Chapter

```javascript
{
	operationName: "GetChapter",
	variables: {
		chapterId: "92",
		cardSlug: "top-interview-questions-easy"
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
	  }
	}`
}
```

- Get Item Content from a Chapter

```javascript
{
	operationName: "GetItem",
	variables: {
		itemId: "1505"
	},
	query: `
	query GetItem($itemId: String!) {
		item(id: $itemId) {
			id
			title
			type
			paidOnly
			lang
			question {
				questionId
				title
				titleSlug
			}
			article {
				id
				title
			}
			video {
				id
			}
			htmlArticle {
				id
			}
			webPage {
				id
			}
		}
		isCurrentUserAuthenticated
	}`
}
```

- Get HTML Article

```javascript
{
	operationName: "GetHtmlArticle",
	variables: {
		htmlArticleId: "156"
	},
	query: `
	query GetHtmlArticle($htmlArticleId: String!) {
		htmlArticle(id: $htmlArticleId) {
			id
			html
			originalLink
			editLink
		}
	}`
}
```
