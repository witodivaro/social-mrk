import { AnyAction } from 'redux';
import { DialogueList, Message } from '../../types/redux/messages/Dialogue';
import { MessagesActionTypes } from './messages.types';
import { addNewMessage } from './messages.utils';

interface MessagesState {
  lastMessages: Message[];
  dialogues: DialogueList;
  sendMessageState: string;
  fetchDialogueState: string;
  fetchAllMessagesState: string;
}

const initialState: MessagesState = {
  lastMessages: [],
  dialogues: {},
  sendMessageState: '',
  fetchAllMessagesState: '',
  fetchDialogueState: '',
};

const messagesReducer = (
  state = initialState,
  { type, payload }: AnyAction
) => {
  switch (type) {
    case MessagesActionTypes.FETCH_LAST_MESSAGES_SUCCESS:
      return {
        ...state,
        lastMessages: payload.lastMessages,
      };

    case MessagesActionTypes.SEND_MESSAGE_LOCAL:
      return {
        ...state,
        dialogues: addNewMessage(state.dialogues, payload.id, payload.message),
      };

    default:
      return state;
  }
};

export default messagesReducer;
