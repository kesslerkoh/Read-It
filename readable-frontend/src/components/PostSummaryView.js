import React, { Component } from 'react'
import './styles/PostSummaryView.css'

class PostSummaryView extends Component {
  render() {
    const { title, author, body, voteScore, commentCount } = this.props
    return (
      <div className='post-summary-entry'>
        <p className='post-summary-title'>
          { title }
        </p>
        <p className='post-summary-author'>
          <span>by </span>
          { author }
        </p>
        <p>
          { body }
        </p>
        <p>
          <span>Vote score: </span>
          { voteScore }
        </p>
        <p>
          <span>Comment count: </span>
          { commentCount }
        </p>
      </div>
    )
  }
}

export default PostSummaryView
