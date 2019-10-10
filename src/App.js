import React, { Component } from 'react';
import './App.css';
import NavBar from './NavBar/NavBar.jsx'
import { Route, Switch } from 'react-router-dom';
import userService from './utils/userService';
import SignupPage from './pages/SignupPage';
import LoginPage from './Login/LoginPage';
import MainPage from './MainPage';
import * as commentsAPI from './services/comments-api';


class App extends Component {
  constructor() {
    super();
    this.state = {
      user: userService.getUser(),
      comments: []
    };
  }

  async componentDidMount() {
    const comments = await commentsAPI.getAll()
    this.setState({
        comments: comments,
        loading: false
    });
    console.log("this is the state",this.state.comments)
}

  handleLogout = () => {
    userService.logout();
    this.setState({ user: null });
  }
  handleSignupOrLogin = () => {
    this.setState({ user: userService.getUser() });
  }


  render() {
    console.log("we know what you are",this.state.comments.comments)
    return (
      <div>
          <NavBar />
        <Switch>
          <Route exact path='/signup' render={({ history }) =>
            <SignupPage
              history={history}
              handleSignupOrLogin={this.handleSignupOrLogin}
            />
          } />
          <Route exact path='/login' render={({ history }) =>
            <LoginPage
              history={history}
              handleSignupOrLogin={this.handleSignupOrLogin}
            />
          } />
          <Route exact path='/commentspage' render={(props) =>
            <MainPage 
            comments={this.state.comments.comments}
            />
          } />

        </Switch>

      </div>
    );
  }
}





export default App;
