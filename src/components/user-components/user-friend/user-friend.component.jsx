import './user-friend.styles.scss';
import React from 'react';
import CustomButton from '../../custom-button/custom-button.component';

const UserFriend = ({ user }) => {
  const { avatarUrl, username } = user;

  return (
    <li className="friends__item">
      <p
        className="friends__avatar"
        style={{
          backgroundImage: `url(${'https://images.unsplash.com/photo-1554080353-a576cf803bda?ixid=MXwxMjA3fDB8MHxzZWFyY2h8MXx8cGhvdG98ZW58MHx8MHw%3D&ixlib=rb-1.2.1&w=1000&q=80'})`,
        }}
      ></p>
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
