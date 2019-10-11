import React from 'react';

const Comments = (props) => {
    const { user, text } = props.comments;
    console.log("props to my people", user.name)
    return (
        <div>
            { user.name ? 
                <h4>{user.name}</h4>
                :
                <h4>NO LOGGED USER</h4>
            }
           
            <h5>{text}</h5>
            
            
        </div>
    );
}



export default Comments;