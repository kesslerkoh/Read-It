import React, { Component } from 'react'
import { Link } from 'react-router-dom'

class PostNotFound extends Component {
  render() {
    return (
      <div>
        <h1>
          Post Not Found
        </h1>

        <p>
          <Link to='/'>
            Please go back to the homepage.
          </Link>
        </p>
      </div>
    )
  }
}

export default PostNotFound
