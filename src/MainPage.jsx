import React, { Component } from 'react'
import CommentForm from './pages/CommentsForm'
import CommentList from './pages/CommentsList'
import logo from './logo.svg';
// import { Route, NavLink } from 'react-router-dom';
import { create } from 'istanbul-reports';
import * as commentsAPI from './services/comments-api';


class MainPage extends Component {
    // constructor(props) {
    //     super(props);
    //     this.addComment = this.addComment.bind(this);
    // }
    state = {
        comments: this.props.comments,
        addComment: []
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
            comments: state.comments.filter(c => c._id !== id)
        }), () => this.props.history.push('/mainpage'));
    }

    async onSubmit(submit) {
        submit.preventDefault();

        if (!this.isFormValid()) {
            this.setState({ error: "All fields are required." });
            return;
        }
        this.setState({ error: "", loading: true });

        let { comment } = this.state;
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
        return this.state.comment.name !== "" && this.state.comment.message !== "";
    }

    /*--- Lifecycle Methods ---*/
    // async componentDidMount() {
    //     console.log(this.props.comments)
    //     const comments = await commentsAPI.getAll()
    //     this.setState({
    //         comments: comments,
    //         loading: false
    //     });
    // }


    render() {
        console.log("HITTING")
        // const loadingSpin = this.state.loading ? "App-logo Spin" : "App-logo";
        console.log(this.state.comments)
        return (
            
            <div className="App container bg-light shadow">
                <header className="App-header">
                    {/* <img src={logo} className={loadingSpin} alt="logo" /> */}
                    <h1 className="App-title">
                        Game Comments
            <span className="px-2" role="img" aria-label="Chat">
                            💬
            </span>
                    </h1>
                </header>
                <div className="row">
                    <div className="col-4  pt-3 border-right">
                        <h6>Say something about your Game</h6>
                        <CommentForm addComment={this.addComment} onSubmit={this.onSubmit}/>
                    </div>
                    <div className="col-8  pt-3 bg-white">
                        <CommentList
                            // loading={this.state.loading}
                            comments={this.state.comments}
                        />
                    </div>
                </div>
            </div>
        );
    }
}

export default MainPage;
