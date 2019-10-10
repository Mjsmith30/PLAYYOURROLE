import React from 'react'
import Comments from "./Comments"


const CommentsList = props => {
    console.log(props)
    return (
        <div>
            <h1>
                <span>{props.comments.length}</span>
                {" "}
                Comments{props.comments.length > 0 ? "s" : ""}
            </h1>
            {props.comments.length === 0 && !props.loading ? (
                <div className="alert text-center alert-info">
                    Be the first to comment
        </div>
            ) : null}
            {props.comments.map((comments, index) => (
                <Comments key={index} comments={comments} />
            ))}
        </div>

    );
}

export default CommentsList;