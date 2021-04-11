import { createSelector, defaultMemoize } from 'reselect';
import { Dialogue, DialogueList } from '../../types/redux/messages/Dialogue';
import { RootState } from '../store';

const selectMessages = (state: RootState) => state.messages;

const selectDialogues = createSelector(
  selectMessages,
  (messages): DialogueList => messages.dialogues
);

export const selectDialoguesList = createSelector(
  selectDialogues,
  (dialogues: DialogueList): Dialogue[] => Object.values(dialogues)
);

export const createDialogueByIdSelector = defaultMemoize(
  (id?: number | string) =>
    createSelector(
      selectDialogues,
      (dialogues: DialogueList): Dialogue | null => {
        if (!id) return null;

        return dialogues[id];
      }
    )
);

export const selectLastMessages = createSelector(
  selectMessages,
  (messages) => messages.lastMessages
);
