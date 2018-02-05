import React, { Component } from 'react'
import PostSummaryView from './PostSummaryView.js'
// import { getPosts } from '../utils/apis.js'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { getPostsAsync, rearrangePosts } from '../actions'
import './styles/ListEntries.css'

class ListEntries extends Component {
  componentDidMount() {
    // Before using redux, this sets component state:
    // getPosts(this.props.categoryName).then((posts) => {
    //   this.setState({ posts: posts })
    // })

    this.props.getPosts(this.props.categoryName)
  }

  componentWillReceiveProps( nextProps ) {
    if (this.props.categoryName !== nextProps.categoryName) {
      this.props.getPosts(nextProps.categoryName)
    }
  }

  rearrangeList = (event) => {
    let selectValue = event.target.value
    if (selectValue === 'none') return

    let currentPosts = this.props.posts
    if (selectValue === 'votes') {
      currentPosts.sort((a,b) => {
        if (a.voteScore > b.voteScore) {
          return -1
        } else if (a.voteScore < b.voteScore) {
          return 1
        }

        return 0
      })
    } else {
      currentPosts.sort((a,b) => {
        if (a.timestamp > b.timestamp) {
          return -1
        } else if (a.timestamp < b.timestamp) {
          return 1
        }

        return 0
      })
    }

    // this.setState({ posts: currentPosts })
    this.props.rearrangePosts(currentPosts)
  }

  render() {
    const { categoryName, posts } = this.props

    return (
      <div>
        { categoryName && categoryName !== 'category' ? 'Category: ' + categoryName : '' }
        <div>
          {
            posts.map((post) => {
              let toValue = '/' + post.category + '/' + post.id
              return (
                <Link className='post-entry' to={ toValue } key={ post.id }>
                  <PostSummaryView
                    title = { post.title }
                    author = { post.author }
                    body = { post.body }
                    voteScore = { post.voteScore }
                  />
                </Link>
              )
            })
          }
        </div>

        <div className='sort-by-section'>
          <span>Sort by </span>
          <select defaultValue='none' onChange={ this.rearrangeList }>
            <option value='none' disabled>none</option>
            <option value='votes'>Votes</option>
            <option value='time'>Time</option>
          </select>
        </div>

        <div className='list-entries-options'>
          <Link to='/creaditPost'>
            <button name='addPost'>
              Create new post
            </button>
          </Link>
        </div>
      </div>
    )
  }
}

function mapStateToProps({ posts }) {
  return {
    posts: Object.values(posts)
  }
}

function mapDispatchToProps(dispatch) {
  return {
    getPosts: (data) => dispatch(getPostsAsync(data)),
    rearrangePosts: (posts) => dispatch(rearrangePosts(posts))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ListEntries)
