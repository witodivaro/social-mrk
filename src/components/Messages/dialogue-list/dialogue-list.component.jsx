import './dialogue-list.styles.scss';
import { useMemo } from 'react';
import DialoguePreview from '../dialogue-preview/dialogue-preview.component';
import { useAppSelector } from '../../../redux/hooks';
import { selectLastMessages } from '../../../redux/messages/messages.selectors';

const DialogueList = () => {
  const lastMessages = useAppSelector(selectLastMessages);

  const renderedDialoguePreviews = useMemo(
    () =>
      lastMessages.map((dialogue) => (
        <DialoguePreview key={`Dialogue ${dialogue.id}`} dialogue={dialogue} />
      )),
    [lastMessages]
  );

  return <div className="dialogue-list">{renderedDialoguePreviews}</div>;
};

export default DialogueList;
