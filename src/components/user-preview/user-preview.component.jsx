import './user-preview.styles.scss';
import React, { useCallback, useMemo } from 'react';
import { ReactComponent as NoAvatar } from '../../assets/images/no-avatar.svg';
import { Link } from 'react-router-dom';
import CustomButton from '../custom-button/custom-button.component';
import { useDispatch } from 'react-redux';
import { addToFriendsStart } from '../../redux/user-interactions/user-interactions.actions';

const UserPreview = ({ user, isFriendRequest }) => {
  const { image, username, id } = user;
  const dispatch = useDispatch();

  const acceptFriendHandler = () => {
    dispatch(addToFriendsStart({ id }));
  };

  const rejectFriendHandler = () => {
    dispatch(addToFriendsStart({ id, accept: false }));
  };

  const renderedUserAvatar = useMemo(
    () =>
      image ? (
        <p
          className="user-preview__avatar"
          style={{
            backgroundImage: `url(${image})`,
          }}
        />
      ) : (
        <NoAvatar className="user-preview__avatar" />
      ),
    [image]
  );

  const renderActions = useCallback(() => {
    if (isFriendRequest) {
      return (
        <>
          <CustomButton
            inverted
            className="user-preview__action"
            onClick={acceptFriendHandler}
            aria-label="Принять заявку в друзья"
          >
            +
          </CustomButton>
          <CustomButton
            inverted
            className="user-preview__action"
            onClick={rejectFriendHandler}
            aria-label="Отклонить заявку в друзья"
          >
            -
          </CustomButton>
        </>
      );
    }
  }, [isFriendRequest]);

  return (
    <Link to={`/id${id}`} className="user-preview">
      {renderedUserAvatar}
      <span className="user-preview__name">{username}</span>
      <div className="user-preview__actions">{renderActions()}</div>
    </Link>
  );
};

export default UserPreview;
