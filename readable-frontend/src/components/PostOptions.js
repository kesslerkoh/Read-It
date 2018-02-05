import React, { Component } from 'react'
import Modal from 'react-modal'
import { connect } from 'react-redux'
import { deletePostAsync, voteOnPostAsync, postCommentAsync } from '../actions'
import './styles/PostOptions.css'
import { Link } from 'react-router-dom'
import { withRouter } from 'react-router'
import FaThumbsDown from 'react-icons/lib/fa/thumbs-down'
import FaThumbsUp from 'react-icons/lib/fa/thumbs-up'

class PostOptions extends Component {
  state = {
    addCommentModalOpen: false,
    author: 'Anonymous T-Rex',
    content: ''
  }

  componentDidMount() {
    Modal.setAppElement('.post-actions')
  }

  toggleCommentsModal = () => {
    this.setState(state => ({
      addCommentModalOpen: !state.addCommentModalOpen
    }))
  }

  submitComment = (event) => {
    event.preventDefault()
    // postComment(this.props.postId, this.state.author, this.state.content)

    this.props.postComment(this.props.postId, this.state.author, this.state.content)

    this.setState({
      addCommentModalOpen: false,
      author: 'Anonymous T-Rex',
      content: ''
    })
  }

  commentContentChanged = (event) => {
    let target = event.target

    this.setState({
      [target.name]: target.value
    })
  }

  deletePost = () => {
    // deletePost(this.props.postId).then((response) => {
    // })

    this.props.deletePost(this.props.postId)
    this.props.history.push('/')
  }

  manageVotes = params => e => {
    if (params === 'increment') {
      // voteOnPost(this.props.postId, 'upVote')
      // .then((response) => {
      //   // HOW TO LET POST OBJECT KNOW TO UPDATE?
          // UPDATE: REDUX handles this nicely...
      // })
      this.props.voteOnPost(this.props.postId, 'upVote')
    } else {
      // voteOnPost(this.props.postId, 'downVote')
      // .then((response) => {
      //   // HOW TO LET POST OBJECT KNOW TO UPDATE?
      // })
      this.props.voteOnPost(this.props.postId, 'downVote')
    }
  }

  render() {
    const { addCommentModalOpen } = this.state
    return (
      <div>
        <div className='post-actions'>
          <div>
            <button value='incrementVotes' className='post-vote-button' onClick={this.manageVotes('increment')}>
              <FaThumbsUp size={15}/>
            </button>
            <button value='decrementVotes' className='post-vote-button' onClick={this.manageVotes('decrement')}>
              <FaThumbsDown size={15}/>
            </button>
          </div>
          <Link to={'/creaditPost/' + this.props.postId}>
            <button>
              Edit post
            </button>
          </Link>

          <button onClick={this.deletePost}>
            Delete post
          </button>
          <button onClick={this.toggleCommentsModal}>
            Add comment
          </button>
        </div>
        <Modal
          isOpen={addCommentModalOpen}
          onRequestClose={this.toggleCommentsModal}>
          <h1>
            Add comment
          </h1>
          <form onSubmit={this.submitComment}>
            <div>
              <span>Author: </span>
              <input type='text' name='author' placeholder='Username' onChange={ this.commentContentChanged } autoFocus/>
            </div>
            <div>
              <span>Comment: </span>
              <input type='text' name='content' placeholder='Enter comment here' onChange={ this.commentContentChanged }/>
            </div>
            <button type='submit'>Submit</button>
          </form>
        </Modal>
      </div>
    )
  }
}

function mapStateToProps({ currentPost }) {
  return {

  }
}

function mapDispatchToProps(dispatch) {
  return {
    deletePost: (id) => dispatch(deletePostAsync(id)),
    voteOnPost: (id, voteString) => dispatch(voteOnPostAsync(id, voteString)),
    postComment: (postId, author, content) => dispatch(postCommentAsync(postId, author, content))
  }
}
const PostOptionsWithRouter = withRouter(PostOptions)
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PostOptionsWithRouter)
