import React, { Component } from 'react';
import './App.css';
import NavBar from './NavBar/NavBar.jsx'
import { Route, Switch } from 'react-router-dom';
import userService from './utils/userService';
import SignupPage from './pages/SignupPage';
import LoginPage from './Login/LoginPage';
import MainPage from './MainPage';

class App extends Component {
  constructor() {
    super();
    this.state = {
      user: userService.getUser()
    };
  }


  handleLogout = () => {
    userService.logout();
    this.setState({ user: null });
  }
  handleSignupOrLogin = () => {
    this.setState({ user: userService.getUser() });
  }


  render() {
    return (
      <div>

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
          <NavBar />
          <Route exact path='/commentspage' render={(props) =>
            <MainPage 
            />
          } />

        </Switch>

      </div>
    );
  }
}





export default App;
