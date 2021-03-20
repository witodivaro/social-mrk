import "./messages-page.styles.scss";
import React, { useState } from "react";

const MessagesPage = () => {
  const [message, setMessage] = useState("");

  const sendMessageHandler = (e) => {
    e.preventDefault();
  };

  const inputChangeHandler = (e) => {
    console.log(e);
  };

  return (
    <div className="messages">
      <form onSubmit={sendMessageHandler}>
        <input type="text" onChange={inputChangeHandler} />
        <button type="submit">Send</button>
      </form>
    </div>
  );
};

export default MessagesPage;
