import { AxiosPromise } from 'axios';
import socialMrk from '../social-mrk';

const messagesEndpoint = '/user-actions/messages/';

const getAllMessages = (): AxiosPromise => {
  return socialMrk.get(messagesEndpoint);
};

export default getAllMessages;
