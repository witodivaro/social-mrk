import './message.styles.scss';
import React from 'react';

const Message = ({ message, isMine }) => {
  const { text, date } = message;

  return (
    <div className={`message ${isMine ? 'message--right' : ''}`}>
      <p className="message__text">{text}</p>
      <span className="message__date">{date.toISOString()}</span>
    </div>
  );
};

export default Message;
