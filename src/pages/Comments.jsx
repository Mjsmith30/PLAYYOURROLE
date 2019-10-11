import React from 'react';

const Comments = (props) => {
    const { name, comment } = props.comments;
    return (
        <div>
            <h4>{name}</h4>
            <h5>{comment}</h5>
            {/* <small>{time}</small> */}
            {/* <Img /> */}
        </div>
    );
}



export default Comments;