import React from 'react';

const Comments = (props) => {
    const { name, message } = props.comments;
    return (
        <div>
            <h4>{name}</h4>
            <h5>{message}</h5>
            {/* <small>{time}</small> */}
            {/* <Img /> */}
        </div>
    );
}



export default Comments;