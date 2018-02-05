import React, { Component } from 'react'
import ListCategories from './ListCategories.js'
import ListEntries from './ListEntries.js'

class Homepage extends Component {
  render() {
    return (
      <div>
        <ListCategories categoryName={ this.props.categoryName } />
        <ListEntries categoryName={ this.props.categoryName } />
      </div>
    )
  }
}

export default Homepage
