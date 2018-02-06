import React, { Component } from 'react'
import PostOptions from './PostOptions.js'
import PostComments from './PostComments.js'
import PostNotFound from './PostNotFound.js'
// import { getPost } from '../utils/apis.js'
import { getPostDetailsAsync } from '../actions'
import { connect } from 'react-redux'
import './styles/PostDetailView.css'

class PostDetailView extends Component {
  // state = {
  //   postObject: {}
  // }

  componentDidMount() {
    // Originally. Without redux.
    // getPost(this.props.postId).then((response) => {
    //   this.setState({ postObject: response })
    // })

    this.props.getPost(this.props.postId)
  }

  render() {
    const { postObject } = this.props
    if (!postObject.deleted && postObject.deleted !== undefined) {
      return (
        <div>
          <div className='post-main-content'>
            <div className='post-title'>
              <h1>
                { this.props.postObject.title }
              </h1>
            </div>
            <div className='post-author'>
              { 'by ' + this.props.postObject.author + ' on ' + new Date(this.props.postObject.timestamp) }
            </div>
            <div className='post-content'>
              { this.props.postObject.body }
            </div>
            <div className='post-vote-score'>
              { 'Vote score: ' + this.props.postObject.voteScore }
            </div>
          </div>

          <PostOptions postId={ this.props.postId } />
          <PostComments postId={ this.props.postId } />
        </div>
        )
    } else {
      return (
        <PostNotFound />
      )
    }


  }
}

function mapStateToProps({ currentPost }) {
  return {
    postObject: currentPost
  }
}

function mapDispatchToProps(dispatch) {
  return {
    getPost: (id) => dispatch(getPostDetailsAsync(id))
  }
}
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PostDetailView)
