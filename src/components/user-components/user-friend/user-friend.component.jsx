import './user-friend.styles.scss';
import React, { useMemo, useRef } from 'react';
import CustomButton from '../../custom-button/custom-button.component';
import { ReactComponent as NoAvatar } from '../../../assets/images/no-avatar.svg';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { manageFriendsStart } from '../../../redux/user-interactions/user-interactions.actions';

const UserFriend = ({ user }) => {
  const { id, image, username, isFriend } = user;
  const dispatch = useDispatch();

  const addToFriendsHandler = (e) => {
    e.preventDefault();
    dispatch(manageFriendsStart({ id, addFriend: true }));
  };

  const removeFromFriendsHandler = (e) => {
    e.preventDefault();
    dispatch(manageFriendsStart({ id, removeFriend: true }));
  };

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

  const renderedAction = useMemo(
    () =>
      isFriend ? (
        <CustomButton
          className="friends__actions"
          onClick={removeFromFriendsHandler}
        >
          -
        </CustomButton>
      ) : (
        <CustomButton
          inverted
          className="friends__actions"
          onClick={addToFriendsHandler}
        >
          +
        </CustomButton>
      ),
    [isFriend, removeFromFriendsHandler, addToFriendsHandler]
  );

  return (
    <li className="friends__item">
      <Link to={`id${id}`} className="friends__link">
        {renderedUserAvatar}
        <span className="friends__name">{username}</span>
        <div className="friends__actions">{renderedAction}</div>
      </Link>
    </li>
  );
};

export default UserFriend;
