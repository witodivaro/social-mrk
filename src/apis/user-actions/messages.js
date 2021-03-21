import socialMrk from '../social-mrk';

const messagesEndpoint = '/user-actions/messages/';

const messages = ({ id, message, isGet }) => {
  if (isGet) {
    return socialMrk.get(messagesEndpoint, {
      params: {
        id,
      },
    });
  }

  return socialMrk.post(messagesEndpoint, {
    id,
    message,
  });
};

export default messages;
