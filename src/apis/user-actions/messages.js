import socialMrk from "../social-mrk";

const messagesEndpoint = "/user-actions/messages/";

const messages = ({ to, message }) => {
  return socialMrk.post(messagesEndpoint, {
    username,
    password,
  });
};

export default messages;
