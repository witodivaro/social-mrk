import { DialogueList, Message } from '../../types/redux/messages/Dialogue';
import cloneDeep from 'lodash.clonedeep';

export const addNewMessage = (
  dialogueList: DialogueList,
  id: number,
  message: Message
) => {
  const newDialogueList = cloneDeep(dialogueList);

  if (newDialogueList[id]) {
    newDialogueList[id].messages.push(message);
  } else {
    newDialogueList[id] = {
      image: '',
      messages: [message],
      username: 'user',
    };
  }

  return newDialogueList;
};
