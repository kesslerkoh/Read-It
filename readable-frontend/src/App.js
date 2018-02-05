import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { Link, Route } from 'react-router-dom';
import Homepage from './components/Homepage.js';
import PostDetailView from './components/PostDetailView.js';
import CreaditPost from './components/CreaditPost.js';

class App extends Component {

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <Link to='/'>
            <img src={logo} className="App-logo" alt="logo" />
            <h1 className="App-title">Read It</h1>
            <h4>Your go-to blogging platform</h4>
          </Link>
        </header>

        <div className="App-body">
          <Route exact path="/" render={() => (
            <Homepage />
          )}/>

          {/* <Route exact path="/category/:categoryName" render={({ match }) => (
            <Homepage categoryName={ match.params.categoryName } />
          )}/> */}

          {/* <Route exact path="/:categoryId/:postId" render={({ match }) => (
            <PostDetailView postId={ match.params.postId } />
          )}/> */}

          <Route exact path="/:categoryName/:postId" render={({ match }) => {
            if (match.params.categoryName === 'category') {
              return <Homepage categoryName={ match.params.postId } />
            } else if (match.params.categoryName === 'creaditPost') {
              return <CreaditPost />
            } else {
              return <PostDetailView postId={ match.params.postId } />
            }
          }}/>

          <Route exact path="/creaditPost" component={CreaditPost}/>
        </div>
      </div>
    );
  }
}

export default App;
