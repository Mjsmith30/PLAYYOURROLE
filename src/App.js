import React, { Component } from 'react';
// import logo from './logo.svg';
import './App.css';
import NavBar from './NavBar/NavBar.jsx'
import { Route, Switch } from 'react-router-dom';
import userService from './utils/userService';
import SignupPage from './pages/SignupPage';
import LoginPage from './Login/LoginPage';

class App extends Component {
  constructor(){
    super();
    this.state = {user: userService.getUser()};
  }


  handleLogout = () => {
    userService.logout();
    this.setState({ user: null });
  }
  handleSignupOrLogin = () => {
    this.setState({user: userService.getUser()});
  }

  


render(){
    
    return (
    <div>
        <header className= 'header'>Play Your Role</header>
      <Switch>
          <Route exact path='/signup' render={({ history }) => 
            <SignupPage
              history={history}
              handleSignupOrLogin={this.handleSignupOrLogin}
            />
          }/>
          <Route exact path='/login' render={({ history }) => 
            <LoginPage
            history={history}
            handleSignupOrLogin={this.handleSignupOrLogin}

            />
          }/>
         
     
      <NavBar />
      </Switch>

    </div>
  )
        }
}



export default App;
