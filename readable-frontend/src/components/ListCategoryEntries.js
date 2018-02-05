import React, { Component } from 'react'
import PostSummaryView from './PostSummaryView.js'
import { getPosts } from '../utils/apis.js'

class ListCategoryEntries extends Component {
  state = {
    posts: []
  }

  componentDidMount() {
    getPosts(this.props.categoryName).then((posts) => {
      this.setState({ posts: posts })
    })
  }

  render() {
    const { categoryName } = this.props

    return (
      <div>
        { categoryName }
        <div>
          {
            this.state.posts.map((post) => (
              <PostSummaryView
                key={ post.id }
                title = { post.title }
                author = { post.author }
                body = { post.body }
              />

            ))
          }
        </div>
      </div>
    )
  }
}

export default ListCategoryEntries
