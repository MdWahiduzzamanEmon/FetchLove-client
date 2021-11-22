import React from 'react';

const Message = ({ message, user, classs }) => {
    // if (!user) {
    //     return;
    // }
    if (user) {
        return (
          <div className={`messageBox ${classs}`}>{`${user}: ${message}`}</div>
        );
    } else {
         return (
           <div className={`messageBox ${classs}`}>{`You: ${message}`}</div>
         );
    }
  
};

export default Message;