import React from 'react'
import Comments from "./Comments"
import CommentCard from "./CommentCard"

function CommentsList(props){
    console.log('hit 1', props.comments)
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
         {props.comments.map(comments =>
         <CommentCard
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