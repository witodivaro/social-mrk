import './user-friend.styles.scss';
import React, { useMemo } from 'react';
import CustomButton from '../../custom-button/custom-button.component';
import { ReactComponent as NoAvatar } from '../../../assets/images/no-avatar.svg';

const UserFriend = ({ user }) => {
  const { image, username } = user;

  const renderedUserAvatar = useMemo(
    () =>
      image ? (
        <p
          className="friends__avatar"
          style={{
            backgroundImage: `url(${image})`,
          }}
        />
      ) : (
        <NoAvatar className="friends__avatar" />
      ),
    [user]
  );

  return (
    <li className="friends__item">
      {renderedUserAvatar}
      <span className="friends__name">{username}</span>
      <div className="friends__button-container">
        <CustomButton inverted className="friends__add-button">
          +
        </CustomButton>
      </div>
    </li>
  );
};

export default UserFriend;
