import './message.styles.scss';
import moment from 'moment';
import 'moment/locale/ru';
moment.locale('ru');

const Message = ({ message, isMine }) => {
  const { text, date } = message;

  return (
    <div className={`message ${isMine ? 'message--right' : ''}`}>
      <p className="message__text">{text}</p>
      <span className="message__date">{moment(date).format('HH:mm')}</span>
    </div>
  );
};

export default Message;
