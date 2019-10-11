import React from "react"

function CommentCard({comments, commentDelete}) { 
    return (
        <div>
            <button
          className='btn btn-xs btn-danger margin-left-10'
          onClick={() => commentDelete(comments._id)}
        >
          DELETE
        </button>
        </div>
    );
}

export default CommentCard;