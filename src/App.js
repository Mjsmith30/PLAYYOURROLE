import React, { Component } from 'react';
import './App.css';
import NavBar from './NavBar/NavBar.jsx'
import { Route, Switch, Link } from 'react-router-dom';
import userService from './utils/userService';
import SignupPage from './pages/SignupPage';
import LoginPage from './Login/LoginPage';
import MainPage from './pages/MainPage';
import * as commentsAPI from './services/comments-api';
// import { create } from 'istanbul-reports';

class App extends Component {
  constructor() {
    super();
    this.state = {
      user: userService.getUser(),
      comments: [],
      isLog: false
    };
  }



  async componentDidMount() {
    const comments = await commentsAPI.getAll()
    this.setState({
      comments: comments,
      loading: false
    });
  }
  addComment = async message => {
  const comment = await commentsAPI.create(message);
    this.setState(state => ({
      loading: false,
      comments: [comment, ...state.comments]
    }), () => this.props.history.push('/commentspage'));
  }

  commentsUpdate = async updatedCommentData => {
    const updatedComments = await commentsAPI.update(updatedCommentData);
    const newCommentsArray = this.state.comments.map(c =>
      c._id === updatedComments._id ? updatedComments : c
    );
    this.setState(
      { comments: newCommentsArray },
      // Using cb to wait for state to update before rerouting
      () => this.props.history.push('/commentspage')
    );
  }

  commentDelete = async id => {
    await commentsAPI.deleteOne(id);
    this.setState(state => ({
      // Yay, filter returns a NEW array
      comments: state.comments.filter(c => c._id !== id)
    }), () => this.props.history.push('/commentspage'));
  }

  async onSubmit(submit) {
    submit.preventDefault();

    if (!this.isFormValid()) {
      this.setState({ error: "All fields are required." });
      return;
    }
    this.setState({ error: "", loading: true });

    let { comment } = this.props;
    fetch("/comments", {
      method: "POST",
      body: JSON.stringify(comment)
    })
      .then(res => res.json())
      .then(res => {
        if (res.error) {
          this.setState({ loading: false, error: res.error });
        } else {
          this.props.addComment(comment);

          this.setState({
            loading: false,
            comment: { ...comment, message: "" }
          })
        }
      })
      .catch(err => {
        this.setState({
          error: "Something went wrong while trying to submit your comment",
          loading: false

        });
      });
  }
  isFormValid() {
    return this.props.comment.name !== "" && this.props.comment.message !== "";
  }
  handleLogout = () => {
    userService.logout();
    this.setState({ user: null });
  }
  handleSignupOrLogin = () => {
    console.log('handlesiorlogin')
    this.setState({ user: userService.getUser(), loggg: true });
  }


  render() {
    // console.log("young and wild",this.state.user)

    return (
      <div>
         <NavBar
        user={this.state.user}
        handleLogout={this.handleLogout}
      />
      <Link to='/commentspage'>CommentsPage</Link>
        <Switch>
          <Route exact path='/signup' render={({ history }) =>
            <SignupPage
              history={history}
              handleSignupOrLogin={this.handleSignupOrLogin}
            />
          } />
          <Route exact path='/login' render={({ history }) =>
          //  userService.getUser() ?
            <LoginPage
              history={history}
              handleSignupOrLogin={this.handleSignupOrLogin}
            />
            
          } />
          <Route exact path='/commentspage' render={(props) =>
            <MainPage
              comments={this.state.comments}
              addComment={this.addComment}
              user={this.state.user}
            />
          } />
          

        </Switch>

      </div>
    );
  }
}





export default App;
