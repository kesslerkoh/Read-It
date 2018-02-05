import uuidv4 from 'uuid'
const baseUrl = 'http://127.0.0.1:3001/'

export function getCategories() {
  return fetch( baseUrl + 'categories',
    {
      headers: { 'Authorization': 'blah' }
    }
  )
  .then((response) => {
    return response.json()
  })
}

export function getPosts(category) {
  let url = baseUrl + 'posts'
  if (category) {
    url = baseUrl + category + '/posts'
  }

  return fetch(url,
    {
      headers: { 'Authorization': 'blah' }
    }
  ).then((response) => {
    return response.json()
  })
}

export function getPost(postId) {
  let url = baseUrl + 'posts/' + postId

  return fetch(url,
    {
      headers: { 'Authorization': 'blah' }
    }
  ).then((response) => {
    return response.json()
  })
}

export function postPost(post) {
  let id = uuidv4()
  let url = baseUrl + 'posts'
  let body = {
    id: id,
    timestamp: Date.now(),
    title: post.title,
    body: post.body,
    author: post.author,
    category: post.category,
    voteScore: 1,
    deleted: false
  }

  return fetch(url,
  {
    method: 'POST',
    headers: {
      'Authorization': 'blah',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(body)
  }).then((response) => {
    return response.json()
  })
}

export function voteOnPost(postId, voteString) {
  let url = baseUrl + 'posts/' + postId
  let optionString = voteString === 'upVote' ? 'upVote' : 'downVote'
  let body = {
    option: optionString
  }

  return fetch(url,
  {
    method: 'POST',
    headers: {
      'Authorization': 'blah',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(body)
  }).then((response) => {
    return response.json()
  })
}

export function deletePost(postId) {
  let url = baseUrl + 'posts/' + postId

  return fetch(url,
  {
    method: 'DELETE',
    headers: {
      'Authorization': 'blah'
    }
  }).then((response) => {
    return response.json()
  })
}

export function editPost(postId, title, content) {
  let url = baseUrl + 'posts/' + postId
  let body = {
    title: title,
    body: content
  }

  return fetch(url,
  {
    method: 'PUT',
    headers: {
      'Authorization': 'blah',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(body)
  }).then((response) => {
    return response.json()
  })
}

// ###############################
// COMMENTS api
// ###############################

export function getComments(postId) {
  let url = baseUrl + 'posts/' + postId + '/comments'

  return fetch(url,
    {
      headers: { 'Authorization': 'blah' }
    }
  ).then((response) => {
    return response.json()
  })
}

export function postComment(postId, author, content) {
  let id = uuidv4()
  let url = baseUrl + 'comments'
  let body = {
    id: id,
    timestamp: Date.now(),
    body: content,
    author: author,
    parentId: postId
  }

  return fetch(url,
  {
    method: 'POST',
    headers: {
      'Authorization': 'blah',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(body)
  }).then((response) => {
    return response.json()
  })
}

export function deleteComment(commentId) {
  let url = baseUrl + 'comments/' + commentId

  return fetch(url,
  {
    method: 'DELETE',
    headers: {
      'Authorization': 'blah'
    }
  }).then((response) => {
    return response.json()
  })
}

export function editComment(commentId, content) {
  let url = baseUrl + 'comments/' + commentId
  let body = {
    timestamp: Date.now(),
    body: content
  }

  return fetch(url,
  {
    method: 'PUT',
    headers: {
      'Authorization': 'blah',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(body)
  }).then((response) => {
    return response.json()
  })
}

export function voteOnComment(commentId, voteString) {
  let url = baseUrl + 'comments/' + commentId
  let optionString = voteString === 'upVote' ? 'upVote' : 'downVote'
  let body = {
    option: optionString
  }

  return fetch(url,
  {
    method: 'POST',
    headers: {
      'Authorization': 'blah',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(body)
  }).then((response) => {
    return response.json()
  })
}
