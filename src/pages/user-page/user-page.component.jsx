import './user-page.styles.scss';

import React, { useCallback, useEffect, useMemo, useState } from 'react';
import CustomButton from '../../components/custom-button/custom-button.component';

import UserAvatar from '../../components/user-components/user-avatar/user-avatar.component';
import UserFriends from '../../components/user-components/user-friends/user-friends.component';
import { useDispatch, useSelector } from 'react-redux';
import {
  selectCurrentUser,
  selectToken,
} from '../../redux/user/user.selectors';
import {
  selectAvatarModalShown,
  selectUserPageState,
  selectUserPageUser,
} from '../../redux/user-page/user-page.selectors';
import { getUserStart } from '../../redux/user-page/user-page.actions';
import { GET_USER_STATES } from '../../config/user-states';
import { ReactComponent as LoadingIndicator } from '../../assets/images/loader.svg';
import UserAvatarPickerModal from '../../components/user-components/user-avatar-picker-modal/user-avatar-picker-modal.component';
import UserStatus from '../../components/user-components/user-status/user-status.component';
import { addToFriendsStart } from '../../redux/user-interactions/user-interactions.actions';

const UserPage = ({ match }) => {
  const token = useSelector(selectToken);
  const dispatch = useDispatch();
  const currentUser = useSelector(selectCurrentUser);
  const userPageUser = useSelector(selectUserPageUser);
  const userPageState = useSelector(selectUserPageState);
  const avatarModalShown = useSelector(selectAvatarModalShown);
  const [isCurrentUser, setIsCurrentUser] = useState(false);

  const { userId } = match.params;

  useEffect(() => {
    dispatch(getUserStart(userId));
  }, [token, userId, getUserStart, dispatch]);

  useEffect(() => {
    setIsCurrentUser(
      !!currentUser && !!userPageUser && userPageUser.id === currentUser.id
    );
  }, [currentUser, userPageUser]);

  const addToFriendsHandler = useCallback(() => {
    dispatch(addToFriendsStart(userId));
  }, [userId]);

  const renderedActions = useMemo(() => {
    return isCurrentUser ? (
      <CustomButton className="user__action">
        Редактировать профиль
      </CustomButton>
    ) : (
      <>
        <CustomButton inverted className="user__action">
          Отправить сообщение
        </CustomButton>
        <CustomButton
          inverted
          className="user__action"
          onClick={addToFriendsHandler}
        >
          Добавить в друзья
        </CustomButton>
      </>
    );
  }, [isCurrentUser]);

  const renderedStatus = useMemo(
    () => <UserStatus status={userPageUser?.status} editable={isCurrentUser} />,
    [isCurrentUser, userPageUser]
  );

  const renderedUserPage = useMemo(
    () =>
      userPageUser ? (
        <div className="user__wrapper">
          <section className="user__info">
            <header className="user__header">
              <article className="user__avatar-container">
                <UserAvatar
                  imageSource={userPageUser.image}
                  editable={isCurrentUser}
                />
                <div className="user__actions">{renderedActions}</div>
              </article>
              <div className="user__details">
                <h3 className="user__name">{userPageUser.username}</h3>
                {renderedStatus}
              </div>
            </header>
          </section>
          <main className="user__main">
            <UserFriends
              className="user__friends"
              friends={userPageUser.friends}
            />
            <section className="user__posts posts">
              <h3 className="posts__title">Posts</h3>
              <div className="posts__list">
                <article className="post">
                  <div className="post__author">
                    <p className="post__avatar">author avatar</p>
                    <p className="post__username">author name</p>
                  </div>
                  <div className="post__details">
                    <p className="post__upload-time">23:34 PM</p>
                  </div>
                  <p className="post__content">Some content lal allalal</p>
                  <div className="post__controls">
                    <button className="post__button post__button--like">
                      Like
                    </button>
                    <button className="post__button post__button--comment">
                      Comment
                    </button>
                  </div>
                </article>
              </div>
            </section>
          </main>
        </div>
      ) : null,
    [userPageUser, renderedActions, renderedStatus]
  );

  const renderContent = useCallback(() => {
    switch (userPageState) {
      case GET_USER_STATES.FETCHING:
        return (
          <p className="user__loading-indicator">
            <LoadingIndicator />
          </p>
        );
      case GET_USER_STATES.FAILURE:
      // return <p>Owibka...</p>;
      case GET_USER_STATES.SUCCESS:
        return renderedUserPage;
    }
  }, [userPageState, userPageUser, renderedUserPage]);

  const renderedAvatarModal = useMemo(
    () => (avatarModalShown ? <UserAvatarPickerModal /> : null),
    [avatarModalShown]
  );

  return (
    <div className="user">
      {renderedAvatarModal}
      {renderContent()}
    </div>
  );
};

export default UserPage;
