import { createSelector, defaultMemoize } from 'reselect';

const selectMessages = (state) => state.messages;

const selectDialogues = createSelector(
  selectMessages,
  (messages) => messages.dialogues
);

export const selectDialoguesList = createSelector(selectMessages, (dialogues) =>
  Object.values(dialogues)
);

export const createDialogueByIdSelector = defaultMemoize((id) =>
  createSelector(selectDialogues, (dialogues) => dialogues[id])
);
