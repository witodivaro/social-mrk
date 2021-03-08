import './user-friend.styles.scss';
import React, { useMemo, useRef } from 'react';
import CustomButton from '../../custom-button/custom-button.component';
import { ReactComponent as NoAvatar } from '../../../assets/images/no-avatar.svg';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addToFriendsStart } from '../../../redux/user-interactions/user-interactions.actions';

const UserFriend = ({ user }) => {
  const { id, image, username } = user;
  const dispatch = useDispatch();

  const addToFriendsHandler = (e) => {
    e.preventDefault();
    dispatch(addToFriendsStart({ id }));
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

  return (
    <li className="friends__item">
      <Link to={`id${id}`} className="friends__link">
        {renderedUserAvatar}
        <span className="friends__name">{username}</span>
        <div className="friends__actions">
          <CustomButton
            inverted
            className="friends__add-button"
            onClick={addToFriendsHandler}
          >
            +
          </CustomButton>
        </div>
      </Link>
    </li>
  );
};

export default UserFriend;
