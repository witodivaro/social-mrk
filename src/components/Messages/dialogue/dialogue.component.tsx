import './dialogue.styles.scss';
import { FormEvent, useEffect, useMemo, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { createDialogueByIdSelector } from '../../../redux/messages/messages.selectors';
import { selectCurrentUserId } from '../../../redux/user/user.selectors';
import Message from '../message/message.component';
import FormInput from '../../form-input/form-input.component';
import CustomButton from '../../custom-button/custom-button.component';
import { ReactComponent as NoAvatar } from '../../../assets/images/no-avatar.svg';
import { Link, RouteComponentProps } from 'react-router-dom';
import { FaPaperPlane } from 'react-icons/fa';
import { Message as MessageType } from '../../../types/redux/messages/Dialogue';
import { useAppDispatch } from '../../../redux/hooks';
import {
  sendMessageLocal,
  sendMessageStart,
} from '../../../redux/messages/messages.actions';

interface DialogueMatchProps {
  userId?: string;
}

const Dialogue = ({ match }: RouteComponentProps<DialogueMatchProps>) => {
  const { userId } = match.params;
  const dispatch = useAppDispatch();
  const currentUserId = useSelector(selectCurrentUserId);
  const dialogue = useSelector(createDialogueByIdSelector(userId));
  const messagesWrapperRef = useRef(null);
  const [newMessage, setNewMessage] = useState('');

  const { image, username } = dialogue || {
    image: null,
    username: 'Wito Divaro',
  };

  useEffect(() => {
    // @ts-ignore
    messagesWrapperRef.current.scrollTop =
      // @ts-ignore
      messagesWrapperRef.current.scrollHeight;
  }, [dialogue]);

  const renderedMessages = useMemo(() => {
    if (!dialogue || dialogue.messages.length === 0) {
      return (
        <p className="dialogue__no-messages">
          Начните вашу историю, отправив первое сообщение!
        </p>
      );
    }

    return dialogue.messages.map((message: MessageType, index: number) => (
      <Message
        key={`message ${index}`}
        message={message}
        isMine={message.from == currentUserId}
      />
    ));
  }, [dialogue, currentUserId]);

  const sendMessageHandler = (e: FormEvent) => {
    e.preventDefault();
    setNewMessage('');
    if (userId) {
      dispatch(sendMessageStart(+userId, newMessage));
      dispatch(
        sendMessageLocal(+userId, {
          text: newMessage,
          date: new Date(),
          from: currentUserId,
        })
      );
    }
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
          value={newMessage}
          onInput={(e: FormEvent<HTMLInputElement>) => {
            setNewMessage(e.currentTarget.value);
          }}
        />
        <CustomButton aria-label="Отправить сообщение" type="submit" inverted>
          <FaPaperPlane />
        </CustomButton>
      </form>
    </div>
  );
};

export default Dialogue;
