import { createSelector, defaultMemoize } from 'reselect';
import { RootState } from '../store';

const selectMessages = (state: RootState) => state.messages;

const selectDialogues = createSelector(
  selectMessages,
  (messages) => messages.dialogues
);

export const selectDialoguesList = createSelector(selectMessages, (dialogues) =>
  Object.values(dialogues)
);

export const createDialogueByIdSelector = defaultMemoize((id: number) =>
  createSelector(selectDialogues, (dialogues) => dialogues[id])
);
