import React, { Component } from 'react'
import { connect } from 'react-redux'
import './styles/PostComments.css'
// import { getComments } from '../utils/apis.js'
import { getCommentsAsync } from '../actions'
import Comment from './Comment.js'

class PostComments extends Component {
  // state = {
  //   commentsArray: []
  // }

  componentDidMount() {
    // getComments(this.props.postId).then((response) => {
    //   this.setState({ commentsArray: response })
    // })

    this.props.getComments(this.props.postId)
  }

  render() {
    return (
      <div className='main-section'>
        <h3 className='main-section-title'>{ this.props.commentsArray.length + ' '}Comment{ this.props.commentsArray.length > 1 ? 's' : '' }</h3>
        <div>
          {
            this.props.commentsArray && this.props.commentsArray.map((comment) => {
              return (
                <Comment key={comment.id} commentDetails={comment} />
              )
            })
          }
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
    getComments: (postId) => dispatch(getCommentsAsync(postId))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PostComments)
