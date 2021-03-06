import './user-avatar.styles.scss';

import React, { useRef } from 'react';
import { ReactComponent as NoAvatar } from '../../../assets/images/no-avatar.svg';
import { changeUserStart } from '../../../redux/user/user.actions';
import { useDispatch } from 'react-redux';
import { toggleAvatarModalShown } from '../../../redux/user-page/user-page.actions';

const UserAvatar = ({ imageSource }) => {
  const dispatch = useDispatch();

  const renderedImage = imageSource ? (
    <img className="avatar__img" src={imageSource} />
  ) : (
    <NoAvatar className="avatar__svg" />
  );

  const toggleAvatarModalHandler = () => {
    dispatch(toggleAvatarModalShown());
  };

  return (
    <p className="avatar" onClick={toggleAvatarModalHandler}>
      {renderedImage}
    </p>
  );
};

export default UserAvatar;
