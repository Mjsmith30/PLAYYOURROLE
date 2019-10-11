import React from 'react'
import Comments from "./Comments"


function CommentsList(props){
    console.log('hit 1', props.comments.comments)
    return (
        <>
        <h1> Comments </h1>
        <div>
            {props.comments.map(comments =>
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