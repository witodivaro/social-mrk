import './user-avatar.styles.scss';

import React, { useRef } from 'react';
import { ReactComponent as NoAvatar } from '../../../assets/images/no-avatar.svg';
import { changeUserStart } from '../../../redux/user/user.actions';

const UserAvatar = ({ imageSource }) => {
  const inputRef = useRef();

  const fileChangeHandler = (e) => {
    const reader = new FileReader();

    reader.onload = async () => {
      await changeUserStart({
        image: reader.result,
      });
    };

    reader.readAsDataURL(e.target.files[0]);
  };

  const renderedImage = imageSource ? (
    <img className="avatar__img" src={imageSource} />
  ) : (
    <NoAvatar className="avatar__svg" />
  );

  return (
    <p className="avatar">
      {renderedImage}
      <input
        className="avatar__input"
        type="file"
        ref={inputRef}
        accept="image/*"
        onChange={fileChangeHandler}
      />
    </p>
  );
};

export default UserAvatar;
