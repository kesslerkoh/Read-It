import React, { Component } from 'react'
import { connect } from 'react-redux'
import FaThumbsDown from 'react-icons/lib/fa/thumbs-down'
import FaThumbsUp from 'react-icons/lib/fa/thumbs-up'
import Modal from 'react-modal'
// import { editComment, deleteComment, voteOnComment } from '../utils/apis.js'
import { editCommentAsync, deleteCommentAsync, voteOnCommentAsync } from '../actions'

class Comment extends Component {
  state = {
    editModalIsOpen: false,
    newAuthor: '',
    newBody: ''
  }

  toggleEditModal = () => {
    this.setState(state => ({
      editModalIsOpen: !state.editModalIsOpen
    }))
  }

  updateComment = (event) => {
    event.preventDefault()

    // editComment(this.props.commentDetails.id, this.state.newBody)
    // .then(response => {
    // })

    this.props.editComment(this.props.commentDetails.id, this.state.newBody)

    this.toggleEditModal()
  }

  deleteComment = (event) => {
    // deleteComment(this.props.commentDetails.id)
    // .then(response => {
    // })

    this.props.deleteComment(this.props.commentDetails.id)
  }

  commentContentChanged = (event) => {
    let value = event.target.value
    let element = event.target.name

    if (element === 'content') {
      this.setState({
        newBody: value
      })
    }
  }

  voteOnComment = voteString => event => {
    // voteOnComment(this.props.commentDetails.id, voteString)

    this.props.voteOnComment(this.props.commentDetails.id, voteString)
  }

  render() {
    const { id, author, timestamp, body, voteScore } = this.props.commentDetails

    return (
      <div className='comment-container' key={id}>
        <p className='comment-author'>
          { author + ' at ' + new Date(timestamp) + ' says:'}
        </p>
        <p className='comment-body'>
          { body }
        </p>
        <div>
          <button className='vote-button' onClick={this.voteOnComment('downVote')}>
            <FaThumbsDown size={15}/>
          </button>
          <button className='vote-button' onClick={this.voteOnComment('upVote')}>
            <FaThumbsUp size={15}/>
          </button>
          <span className='vote-score'>
            { voteScore + ' votes'}
          </span>

          <button onClick={this.toggleEditModal}>
            Edit comment
          </button>
          <Modal isOpen={this.state.editModalIsOpen} onRequestClose={this.toggleEditModal}>
            <h5>
              Edit comment
            </h5>
            <form onSubmit={this.updateComment}>
              <div>
                <span>Author: </span>
                <input type='text' name='author' value={author} disabled/>
              </div>
              <div>
                <span>Comment: </span>
                <input type='text' name='content' value={this.state.newBody || body} onChange={ this.commentContentChanged } autoFocus/>
              </div>

              <button type='submit'>Submit</button>
            </form>
          </Modal>

          <button onClick={this.deleteComment}>
            Delete comment
          </button>
        </div>
      </div>
    )
  }
}

function mapStateToProps({ comments }) {
  return {
    commentsArray: comments
  }
}

function mapDispatchToProps(dispatch) {
  return {
    editComment: (commentId, newBody) => dispatch(editCommentAsync(commentId, newBody)),
    deleteComment: (commentId) => {
      dispatch(deleteCommentAsync(commentId))
    },
    voteOnComment: (commentId, voteString) => dispatch(voteOnCommentAsync(commentId, voteString))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Comment)
