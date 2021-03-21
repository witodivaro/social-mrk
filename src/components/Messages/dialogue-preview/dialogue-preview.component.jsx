import './dialogue-preview.styles.scss';
import React from 'react';
import { ReactComponent as NoAvatar } from '../../../assets/images/no-avatar.svg';
import { Link, useRouteMatch } from 'react-router-dom';

const DialoguePreview = ({ dialogue }) => {
  const match = useRouteMatch();
  const { username, message, image, id } = dialogue;

  return (
    <Link className="dialogue-preview" to={`${match.path}/${id}`}>
      <p className="dialogue-preview__avatar">{image ? '' : <NoAvatar />}</p>
      <div className="dialogue-preview__details">
        <p className="dialogue-preview__username">{username}</p>
        <p className="dialogue-preview__message">{message}</p>
      </div>
    </Link>
  );
};

export default DialoguePreview;
