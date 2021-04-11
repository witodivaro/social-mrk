import { HandledNetworkError } from '../../types/HandledErrors';
import { Message } from '../../types/redux/messages/Dialogue';
import { MessagesActionTypes } from './messages.types';

export const sendMessageLocal = (id: number, message: Message) => ({
  type: MessagesActionTypes.SEND_MESSAGE_LOCAL,
  payload: { id, message },
});

export const sendMessageStart = (id: number, message: string) => ({
  type: MessagesActionTypes.SEND_MESSAGE_START,
  payload: { id, message },
});

export const sendMessageSuccess = () => ({
  type: MessagesActionTypes.SEND_MESSAGE_SUCCESS,
});

export const sendMessageFailure = () => ({
  type: MessagesActionTypes.SEND_MESSAGE_SUCCESS,
});

export const fetchLastMessagesStart = () => ({
  type: MessagesActionTypes.FETCH_LAST_MESSAGES_START,
});

export const fetchLastMessagesSuccess = (lastMessages: []) => ({
  type: MessagesActionTypes.FETCH_LAST_MESSAGES_SUCCESS,
  payload: { lastMessages },
});

export const fetchLastMessagesFailure = (error: HandledNetworkError) => ({
  type: MessagesActionTypes.FETCH_LAST_MESSAGES_FAILURE,
  payload: { error },
});

export const fetchDialogueStart = (id: number) => ({
  type: MessagesActionTypes.FETCH_DIALOGUE_START,
  payload: { id },
});
