import './dialogue.styles.scss';
import React, { useEffect, useMemo, useRef } from 'react';
import { useSelector } from 'react-redux';
import { createDialogueByIdSelector } from '../../../redux/messages/messages.selectors';
import { selectCurrentUserId } from '../../../redux/user/user.selectors';
import Message from '../message/message.component';
import FormInput from '../../form-input/form-input.component';
import CustomButton from '../../custom-button/custom-button.component';
import { ReactComponent as NoAvatar } from '../../../assets/images/no-avatar.svg';
import { Link } from 'react-router-dom';
import { FaPaperPlane } from 'react-icons/fa';

const Dialogue = ({ match }) => {
  const { userId } = match.params;
  const currentUserId = useSelector(selectCurrentUserId);
  const dialogue = useSelector(createDialogueByIdSelector(userId));
  const messagesWrapperRef = useRef();

  const { messages, image, username } = dialogue || {
    messages: [],
    image: null,
    username: 'Wito Divaro',
  };

  useEffect(() => {
    messagesWrapperRef.current.scrollTop =
      messagesWrapperRef.current.scrollHeight;
  }, []);

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

  const sendMessageHandler = (e) => {
    e.preventDefault();
  };

  const renderedAvatar = useMemo(() => (image ? null : <NoAvatar />), [
    image,
    NoAvatar,
  ]);

  return (
    <div className="dialogue">
      <header className="dialogue__header">
        <Link to={`/id${userId}`} className="dialogue__avatar">
          {renderedAvatar}
        </Link>
        <p className="dialogue__username">{username}</p>
      </header>
      <div className="dialogue__messages-wrapper" ref={messagesWrapperRef}>
        <div className="dialogue__messages">{renderedMessages}</div>
      </div>
      <form className="dialogue__form" onSubmit={sendMessageHandler}>
        <FormInput
          placeholder="Отправьте сообщение.."
          className="dialogue__input"
        />
        <CustomButton aria-label="Отправить сообщение" inverted>
          <FaPaperPlane />
        </CustomButton>
      </form>
    </div>
  );
};

export default Dialogue;
