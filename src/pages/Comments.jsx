import React from 'react';

const Comments = (props) => {
    const { user, text } = props.comments;
    console.log("props to my people",props.comments)
    return (
        <div>
            <h4>{user.name}</h4>
            <h5>{text}</h5>
            {/* <small>{time}</small> */}
            {/* <Img /> */}
        </div>
    );
}



export default Comments;