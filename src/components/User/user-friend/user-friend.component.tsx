import './user-friend.styles.scss';
import { useMemo, MouseEvent, useState, useEffect } from 'react';
import CustomButton from '../../custom-button/custom-button.component';
import { ReactComponent as NoAvatar } from '../../../assets/images/no-avatar.svg';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { selectCurrentUserId } from '../../../redux/user/user.selectors';
import {
  addFriendStart,
  removeFriendStart,
} from '../../../redux/socials/socials.actions';
import { UserFriend as UserFriendType } from '../../../types/redux/user/User';
import AddToFriendsButton from '../../Interactive/add-to-friends-button/add-to-friends-button.component';
import { FaTimes, FaUserPlus } from 'react-icons/fa';

interface UserFriendsProps {
  user: UserFriendType;
}

const UserFriend = ({ user }: UserFriendsProps) => {
  const { id, image, username, isFriend } = user;
  const dispatch = useDispatch();
  const currentUserId = useSelector(selectCurrentUserId);

  const addToFriendsHandler = (e: MouseEvent): void => {
    e.preventDefault();
    dispatch(addFriendStart(id));
  };

  const removeFromFriendsHandler = (e: MouseEvent): void => {
    e.preventDefault();
    dispatch(removeFriendStart(id));
  };

  const renderedUserAvatar = useMemo(
    (): JSX.Element =>
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

  const renderedAction = useMemo((): JSX.Element | null => {
    if (currentUserId === id) {
      return null;
    }

    if (isFriend) {
      return (
        <CustomButton
          className="friends__action"
          onClick={removeFromFriendsHandler}
        >
          <FaTimes />
        </CustomButton>
      );
    }

    return (
      <AddToFriendsButton className="friends__action" id={id} inverted>
        <FaUserPlus />
      </AddToFriendsButton>
    );
  }, [
    isFriend,
    currentUserId,
    id,
    removeFromFriendsHandler,
    addToFriendsHandler,
  ]);

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
