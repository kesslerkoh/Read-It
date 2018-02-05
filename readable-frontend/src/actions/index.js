import { getPosts, getCategories, getPost, editPost, postPost, deletePost, voteOnPost, postComment, getComments, editComment, deleteComment, voteOnComment } from '../utils/apis.js'

export const ADD_POST = 'ADD_POST'
export const EDIT_POST = 'EDIT_POST'
export const VIEW_POSTS = 'VIEW_POSTS'
export const DELETE_POST = 'DELETE_POST'
export const VIEW_POST_DETAILS = 'VIEW_POST_DETAILS'
export const VOTE_ON_POST = 'VOTE_ON_POST'
export const REARRANGE_POSTS = 'REARRANGE_POSTS'

export const VIEW_CATEGORIES = 'VIEW_CATEGORIES'

export const ADD_COMMENT = 'ADD_COMMENT'
export const EDIT_COMMENT = 'EDIT_COMMENT'
export const DELETE_COMMENT = 'DELETE_COMMENT'
export const VOTE_ON_COMMENT = 'VOTE_ON_COMMENT'
export const VIEW_POST_COMMENTS = 'VIEW_POST_COMMENTS'

export function viewPosts (posts) {
  return {
    type: VIEW_POSTS,
    posts
  }
}

export function viewCategories (categoriesObject) {
  return {
    type: VIEW_CATEGORIES,
    categories: categoriesObject.categories
  }
}

export function viewPostDetails (post) {
  return {
    type: VIEW_POST_DETAILS,
    post
  }
}

export function editPostDetails (post) {
  return {
    type: EDIT_POST,
    post
  }
}

export function addPost (post) {
  return {
    type: ADD_POST,
    post
  }
}

export function deletePostAction (id) {
  return {
    type: DELETE_POST,
    id
  }
}

export function voteOnPostAction(post) {
  return {
    type: VOTE_ON_POST,
    post
  }
}

export function postCommentAction(comment) {
  return {
    type: ADD_COMMENT,
    comment
  }
}

export function viewPostComments(comments) {
  return {
    type: VIEW_POST_COMMENTS,
    comments
  }
}

export function editPostComment(comment) {
  return {
    type: EDIT_COMMENT,
    comment
  }
}

export function deletePostComment(comment) {
  return {
    type: DELETE_COMMENT,
    comment
  }
}

export function voteOnCommentAction(comment) {
  return {
    type: VOTE_ON_COMMENT,
    comment
  }
}

export function rearrangePosts(posts) {
  return {
    type: REARRANGE_POSTS,
    posts
  }
}

//##################
// THUNKS
//##################


export function getPostsAsync(data) {
  return dispatch => {
    return getPosts(data).then(
      response => {
        dispatch(viewPosts(response))
      }
    )
  }
}

export function getCategoriesAsync() {
  return dispatch => {
    return getCategories().then(
      response => {
        dispatch(viewCategories(response))
      }
    )
  }
}

export function getPostDetailsAsync(id) {
  return dispatch => {
    return getPost(id).then(
      response => {
        dispatch(viewPostDetails(response))
      }
    )
  }
}

export function editPostAsync(id, title, body) {
  return dispatch => {
    return editPost(id, title, body).then(
      response => {
        dispatch(editPostDetails(response))
      }
    )
  }
}

export function addPostAsync(title, body, author, category) {
  let post = {
    title: title,
    body: body,
    author: author,
    category: category
  }
  return dispatch => {
    return postPost(post).then(
      response => {
        dispatch(addPost(response))
      }
    )
  }
}

export function deletePostAsync(id) {
  return dispatch => {
    return deletePost(id).then(
      response => {
        dispatch(deletePostAction(response))
      }
    )
  }
}

export function voteOnPostAsync(id, voteString) {
  return dispatch => {
    return voteOnPost(id, voteString).then(
      response => {
        dispatch(voteOnPostAction(response))
      }
    )
  }
}

export function postCommentAsync(postId, author, content) {
  return dispatch => {
    return postComment(postId, author, content).then(
      response => {
        dispatch(postCommentAction(response))
      }
    )
  }
}

export function getCommentsAsync(postId) {
  return dispatch => {
    return getComments(postId).then(
      response => {
        dispatch(viewPostComments(response))
      }
    )
  }
}

export function editCommentAsync(commentId, newBody) {
  return dispatch => {
    return editComment(commentId, newBody).then(
      response => {
        dispatch(editPostComment(response))
      }
    )
  }
}

export function deleteCommentAsync(commentId) {
  return dispatch => {
    return deleteComment(commentId)
    .then(response => {
      dispatch(deletePostComment(response))
    })
  }
}

export function voteOnCommentAsync(commentId, voteString) {
  return dispatch => {
    return voteOnComment(commentId, voteString).then(
      response => {
        dispatch(voteOnCommentAction(response))
      }
    )
  }
}
