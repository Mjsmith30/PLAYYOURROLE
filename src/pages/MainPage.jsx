import React from "react"
import CommentForm from './CommentsForm'
import CommentList from './CommentsList'



const MainPage = props => {
    console.log("comments from mainpage", props.comments)
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
                        <CommentForm addComment={props.addComment}/>
                    </div>
                    <div className="col-8  pt-3 bg-white">
                        <CommentList
                            loading={props.loading}
                            comments={props.comments}
                           
                        />
                    </div>
                </div>
            </div>
        );
    }


export default MainPage;