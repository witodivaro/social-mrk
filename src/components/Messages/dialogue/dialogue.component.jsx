import './dialogue.styles.scss';
import React, { useEffect, useMemo } from 'react';
import { useSelector } from 'react-redux';
import { createDialogueByIdSelector } from '../../../redux/messages/messages.selectors';
import { selectCurrentUserId } from '../../../redux/user/user.selectors';
import Message from '../message/message.component';

const Dialogue = ({ match }) => {
  const { userId } = match.params;
  const currentUserId = useSelector(selectCurrentUserId);
  const dialogue = useSelector(createDialogueByIdSelector(userId));

  const { messages } = dialogue;

  useEffect(() => {}, []);

  const renderedMessages = useMemo(
    () =>
      messages.map((message, index) => (
        <Message
          key={`message ${index}`}
          message={message}
          isMine={message.from == currentUserId}
        />
      )),
    [messages, currentUserId]
  );

  return (
    <div className="dialogue">
      <div className="dialogue__messages">{renderedMessages}</div>
    </div>
  );
};

export default Dialogue;
