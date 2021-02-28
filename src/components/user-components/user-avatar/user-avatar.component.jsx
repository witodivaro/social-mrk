import './user-avatar.styles.scss';

import React, { useRef, useState } from 'react';
import { ReactComponent as NoAvatar } from '../../../assets/images/no-avatar.svg';
import changeUser from '../../../apis/change-user';
import { useSelector } from 'react-redux';
import { selectToken } from '../../../redux/user/user.selectors';

const UserAvatar = () => {
  const inputRef = useRef();
  const [imageSource, setImageSource] = useState();
  const token = useSelector(selectToken);

  const fileChangeHandler = (e) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      changeUser({
        image: reader.result,
      }).then((res) => console.log(res));
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
