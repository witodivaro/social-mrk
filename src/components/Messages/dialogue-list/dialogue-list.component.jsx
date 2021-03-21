import './dialogue-list.styles.scss';
import React, { useMemo } from 'react';
import DialoguePreview from '../dialogue-preview/dialogue-preview.component';

const mockDialogues = [
  {
    username: 'WIto',
    image: null,
    message:
      'Я русский Я русский Я русский Я русский Я русский Я русский Я русский ',
    id: 1,
  },
  {
    username: 'WIto',
    image: null,
    message:
      'Я русский Я русский Я русский Я русский Я русский Я русский Я русский ',
    id: 2,
  },
  {
    username: 'WIto',
    image: null,
    message:
      'Я русский Я русский Я русский Я русский Я русский Я русский Я русский ',
    id: 3,
  },
  {
    username: 'WIto',
    image: null,
    message:
      'Я русский Я русский Я русский Я русский Я русский Я русский Я русский ',
    id: 4,
  },
];

const DialogueList = () => {
  const renderedDialoguePreviews = useMemo(
    () =>
      mockDialogues.map((dialogue) => (
        <DialoguePreview key={`Dialogue ${dialogue.id}`} dialogue={dialogue} />
      )),
    [mockDialogues]
  );

  return <div className="dialogue-list">{renderedDialoguePreviews}</div>;
};

export default DialogueList;
