import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
// import { getCategories, postPost, editPost } from '../utils/apis.js'
import { getPostDetailsAsync, getCategoriesAsync, editPostAsync, addPostAsync } from '../actions'
import { connect } from 'react-redux'
import './styles/CreaditPost.css'

class CreaditPost extends Component {
  // Need component state for form data
  state = {
    categoryOptions: [],
    title: '',
    body: '',
    author: '',
    category: 'udacity'
  }

  componentDidMount() {
    if (this.props.match.params.postId) {
      this.props.getPost(this.props.match.params.postId).then(response => {
        this.setState((state) => ({
          title: this.props.post.title,
          body: this.props.post.body,
          author: this.props.post.author,
          category: this.props.post.category
        }))
      })
    }

    // if (this.props.match.params.postId) {
    //   getPost(this.props.match.params.postId).then((response) => {
    //     this.setState({
    //       title: response.title,
    //       body: response.body,
    //       author: response.author,
    //       category: response.category
    //     })
    //   })
    // }

    // getCategories().then((response) => {
    //   this.setState({
    //     categoryOptions: response.categories
    //   })
    // })

    this.props.getCategories().then(response => {
      this.setState({
        categoryOptions: this.props.categories
      })
    })
  }

  handleChange = (event) => {
    let key = event.target.name
    let value = event.target.value

    this.setState({
      [key]: value
    })
  }

  handleSubmit = (event) => {
    if (this.props.match.params.postId) {
      this.props.editPost(this.props.match.params.postId, this.state.title, this.state.body)
    } else {
      this.props.addPost(this.state.title, this.state.body, this.state.author, this.state.category)
    }

    event.preventDefault()
    this.props.history.goBack()
  }

  render() {
    const { postId } = this.props.match.params

    return (
      <div>
        {
          postId ? <h4>Edit Post</h4> : <h4>Create Post</h4>
        }

        <form onSubmit={this.handleSubmit}>
          <div>
            <div>Title</div>
            <input type='text' name='title' value={this.state.title} size='90' onChange={this.handleChange} autoFocus />
          </div>
          <div>
            <div>Author</div>
            <input type='text' name='author' value={this.state.author} onChange={this.handleChange} disabled={ postId }/>
          </div>
          <div>
            <div>Content</div>
            <textarea rows='15' cols='90' name='body' value={this.state.body} onChange={this.handleChange} />
          </div>
          <select name='category' required value={this.state.category} onChange={ this.handleChange } disabled={ postId }>
            {
              this.state.categoryOptions.map((category) => (
                <option value={category.name} key={category.name}>{category.name}</option>
              ))
            }
          </select>
          <input type='submit' value='Submit' />
        </form>
      </div>
    )
  }
}

function mapStateToProps({ categories, currentPost }) {
  return {
    categories: categories,
    post: currentPost
  }
}

function mapDispatchToProps(dispatch) {
  return {
    getPost: (id) => dispatch(getPostDetailsAsync(id)),
    getCategories: () => dispatch(getCategoriesAsync()),
    editPost: (id, title, body) => dispatch(editPostAsync(id, title, body)),
    addPost: (title, body, author, category) => dispatch(addPostAsync(title, body, author, category))
  }
}

const CreaditPostWithRouter = withRouter(CreaditPost)
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CreaditPostWithRouter)
