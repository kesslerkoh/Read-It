import { VIEW_POSTS, VIEW_POST_DETAILS, ADD_POST, EDIT_POST, VIEW_CATEGORIES, DELETE_POST, VOTE_ON_POST, REARRANGE_POSTS, VIEW_POST_COMMENTS, ADD_COMMENT, EDIT_COMMENT, DELETE_COMMENT, VOTE_ON_COMMENT } from '../actions'
import { combineReducers } from 'redux'

const defaultData = {
  '123456': {
    id: '123456',
    timestamp: 1467166872634,
    title: 'First default post',
    body: 'Everyone says so after all.',
    author: 'thingtwo',
    category: 'react',
    voteScore: 6,
    deleted: false,
    commentCount: 2
  },
  '123457': {
    id: '123457',
    timestamp: 1468479767190,
    title: 'Second default post',
    body: 'Just kidding. It takes more than 10 minutes to learn technology.',
    author: 'thingone',
    category: 'redux',
    voteScore: -5,
    deleted: false,
    commentCount: 0
  }
}

const defaultCategories = {
  'react': {
    name: 'react',
    path: 'react'
  },
  'tofu': {
    name: 'tofu',
    path: 'tofu'
  }
}

const defaultPost = {
  id: '1234448',
  timestamp: 1468479767199,
  title: 'Default post',
  body: 'Just a default post.',
  author: 'thingone default user',
  category: 'redux',
  voteScore: 8,
  deleted: true,
  commentCount: 0
}

function posts (state = defaultData, action) {
  switch (action.type) {
    case VIEW_POSTS:
      return action.posts
    case ADD_POST:
      return {
        ...state,
        [action.post.id]: action.post
      }
    case DELETE_POST:
      return state.filter(post => (
        post.id !== action.post.id
      ))
    case REARRANGE_POSTS:
      return action.posts
    case VOTE_ON_POST:
      return state.map(post => {
        if (post.id === action.post.id) {
          return action.post
        }

        return post
      })
    default:
      return state
  }
}

function categories (state = defaultCategories, action) {
  switch (action.type) {
    case VIEW_CATEGORIES:
      return action.categories
    default:
      return state
  }
}

function currentPost (state = defaultPost, action) {
  switch (action.type) {
    case VIEW_POST_DETAILS:
      return action.post
    case EDIT_POST:
      return action.post
    case VOTE_ON_POST:
      return action.post
    default:
      return state
  }
}

function comments (state = [], action) {
  switch (action.type) {
    case ADD_COMMENT:
      return [
        ...state,
        action.comment
      ]
    case VIEW_POST_COMMENTS:
      return action.comments
    case EDIT_COMMENT:
      let commentsArray = state.filter(comment =>
        comment.id !== action.comment.id
      )
      return [
        ...commentsArray,
        action.comment
      ]
    case DELETE_COMMENT:
      return state.filter(comment =>
        comment.id !== action.comment.id
      )
    case VOTE_ON_COMMENT:
      return state.map(comment => {
        if (comment.id === action.comment.id) {
          comment.voteScore = action.comment.voteScore
        }

        return comment
      })
    default:
      return state
  }
}

export default combineReducers({
  posts,
  categories,
  currentPost,
  comments
})
