import { AxiosPromise } from 'axios';
import socialMrk from '../social-mrk';

const messagesEndpoint = '/user-actions/messages/';

const sendMessage = (id: number, message: string): AxiosPromise => {
  return socialMrk.post(messagesEndpoint, {
    id,
    message,
  });
};

export default sendMessage;
