import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { getCategoriesAsync } from '../actions'
import './styles/ListCategories.css'

class ListCategories extends Component {
  // state = {
  //   categories: []
  // }

  componentDidMount() {
    // Before having used redux:
    // getCategories()
    //   .then(categoriesObject => {
    //     this.setState({
    //       categories: categoriesObject.categories
    //     })
    //   })

    this.props.getCategories()
  }

  render() {
    let cats = this.props.categories
    let currentCategory = this.props.categoryName

    return (
      <ul className='category-list'>
        <li className={ !currentCategory ? 'selected-category' : '' }>
          <Link to='/'>
            Home
          </Link>
        </li>
      {
        cats.map((category) => (
          <li key={ category.name }
            className={ currentCategory === category.name ? 'selected-category' : ''}>
            <Link to={ '/category/' + category.path }>
              { category.name }
            </Link>
          </li>
        ))
      }
    </ul>
    )
  }
}

function mapStateToProps({ categories }) {
  return {
    categories: Object.values(categories)
  }
}

function mapDispatchToProps(dispatch) {
  return {
    getCategories: () => dispatch(getCategoriesAsync())
  }
}
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ListCategories)
