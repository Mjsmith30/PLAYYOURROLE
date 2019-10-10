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
  }
  addComment = async Comment => {
    const comment = await create(Comment);
    this.setState(state => ({
      loading: false,
      comments: [comment, ...this.state.comments]
    }), () => this.props.history.push('/mainpage'));
  }

  commentsUpdate = async updatedCommentData => {
    const updatedComments = await commentsAPI.update(updatedCommentData);
    const newCommentsArray = this.state.comments.map(c =>
      c._id === updatedComments._id ? updatedComments : c
    );
    this.setState(
      { comments: newCommentsArray },
      // Using cb to wait for state to update before rerouting
      () => this.props.history.push('/mainpage')
    );
  }

  commentDelete = async id => {
    await commentsAPI.deleteOne(id);
    this.setState(state => ({
      // Yay, filter returns a NEW array
      comments: this.props.comments.filter(c => c._id !== id)
    }), () => this.props.history.push('/mainpage'));
  }

  async onSubmit(submit) {
    submit.preventDefault();

    if (!this.isFormValid()) {
      this.setState({ error: "All fields are required." });
      return;
    }
    this.setState({ error: "", loading: true });

    let { comment } = this.props;
    fetch("http://localhost:3001/comments", {
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
    this.setState({ user: userService.getUser() });
  }


  render() {
    console.log("we know what you are", this.state.comments.comments)
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
