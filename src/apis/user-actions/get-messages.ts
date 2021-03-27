import { AxiosPromise } from 'axios';
import socialMrk from '../social-mrk';

const messagesEndpoint = '/user-actions/messages/';

const getMessages = (id: number): AxiosPromise => {
  return socialMrk.get(messagesEndpoint, {
    params: {
      id,
    },
  });
};

export default getMessages;
