import React from 'react'
import Comments from "./Comments"


function CommentsList(props){
    return (
        <>
        <h1> Comments </h1>
        <div>
            {this.props.comments.map(comments =>
             <Comments 
             key={comments._id} 
             comments={comments} 
             commentDelete={props.commentDelete} 
             />
        )}
               
        </div>
        </>

    );
}

export default CommentsList;