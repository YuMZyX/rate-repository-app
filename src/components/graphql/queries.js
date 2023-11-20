import { gql } from '@apollo/client'
import { REPOSITORY_BASE_FIELDS, USER_BASE_FIELDS } from './fragments'

export const GET_REPOSITORIES = gql`
  query repositories($after: String, $first: Int, $orderBy: AllRepositoriesOrderBy!, 
    $orderDirection: OrderDirection!, $searchKeyword: String!) {
    repositories(after: $after, first: $first, orderBy: $orderBy, 
      orderDirection: $orderDirection, searchKeyword: $searchKeyword) {
      edges {
        node {
          ...repositoryBaseFields
          ratingAverage
          reviewCount
        }
        cursor
      }
      pageInfo {
        endCursor
        startCursor
        hasNextPage
      }
    }
  }
  ${REPOSITORY_BASE_FIELDS}
`
export const GET_REPOSITORY = gql`
  query repository($repositoryId: ID!, $after: String, $first: Int) {
    repository(id: $repositoryId) {
      ...repositoryBaseFields
      ratingAverage
      reviewCount
      reviews(first: $first, after: $after) {
        edges {
          node {
            id
            text
            rating
            createdAt
            user {
              id
              username
            }
            repository {
              fullName
            }
          }
          cursor
        }
        pageInfo {
          endCursor
          startCursor
          hasNextPage
        }
      }
    }
  }
  ${REPOSITORY_BASE_FIELDS}
`
export const AUTHENTICATE = gql`
  mutation authorize($credentials: AuthenticateInput!) {
    authenticate(credentials: $credentials) {
      accessToken
      user {
        ...userBaseFields
      }
    }
  }
  ${USER_BASE_FIELDS}
`
export const ME = gql`
  query getCurrentUser($includeReviews: Boolean = false) {
    me {
      ...userBaseFields
      reviews @include(if: $includeReviews) {
        edges {
          node {
            id
            text
            rating
            createdAt
            repository {
              id
              fullName
            }
            user {
              id
              username
            }
          }
        }
      }
    }
  }
  ${USER_BASE_FIELDS}
`
export const CREATE_REVIEW = gql`
  mutation createNewReview($review: CreateReviewInput) {
    createReview(review: $review) {
      id
      repositoryId
    }
  }
`
export const CREATE_USER = gql`
  mutation createNewUser($user: CreateUserInput) {
    createUser(user: $user) {
      id
      username
    }
  }
`
export const DELETE_REVIEW = gql`
  mutation removeReview($deleteReviewId: ID!) {
    deleteReview(id: $deleteReviewId)
  }
`