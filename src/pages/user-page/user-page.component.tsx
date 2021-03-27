import './user-page.styles.scss';

import React, { useCallback, useEffect, useMemo } from 'react';
import CustomButton from '../../components/custom-button/custom-button.component';

import UserAvatar from '../../components/User/user-avatar/user-avatar.component';
import UserFriends from '../../components/User/user-friends/user-friends.component';
import { useDispatch, useSelector } from 'react-redux';
import { selectCurrentUser } from '../../redux/user/user.selectors';
import {
  selectAvatarModalShown,
  selectUserPageErrors,
  selectUserPageState,
  selectUserPageUser,
} from '../../redux/user-page/user-page.selectors';
import {
  getUserStart,
  setUserPageUser,
} from '../../redux/user-page/user-page.actions';
import { CHANGE_USER_STATES, GET_USER_STATES } from '../../config/user-states';
import { ReactComponent as LoadingIndicator } from '../../assets/images/loader.svg';
import UserAvatarPickerModal from '../../components/User/user-avatar-picker-modal/user-avatar-picker-modal.component';
import UserStatus from '../../components/User/user-status/user-status.component';
import PageNotFound from '../../components/page-not-found/page-not-found.component';
import { addFriendStart } from '../../redux/socials/socials.actions';
import { RouteComponentProps } from 'react-router';
import AddToFriends from '../../components/Interactive/add-to-friends-button/add-to-friends-button.component';
import AddToFriendsButton from '../../components/Interactive/add-to-friends-button/add-to-friends-button.component';

type MatchParams = { userId?: string };

interface UserPageProps extends RouteComponentProps<MatchParams> {}

const UserPage = ({ match }: UserPageProps) => {
  const dispatch = useDispatch();
  const currentUser = useSelector(selectCurrentUser);
  const userPageUser = useSelector(selectUserPageUser);
  const userPageState = useSelector(selectUserPageState);
  const userPageErrors = useSelector(selectUserPageErrors);
  const avatarModalShown = useSelector(selectAvatarModalShown);

  const { userId } = match.params;

  const isCurrentUser = useMemo(() => {
    if (!userId || !currentUser) return false;

    return currentUser.id === +userId || +userId === 0;
  }, [currentUser, userId]);

  useEffect(() => {
    if (!userId) return;

    if (currentUser?.id === +userId) {
      dispatch(setUserPageUser(currentUser));
    } else {
      dispatch(getUserStart(+userId));
    }
  }, [
    dispatch,
    isCurrentUser,
    getUserStart,
    currentUser,
    setUserPageUser,
    userId,
  ]);

  const addToFriendsHandler = useCallback(() => {
    if (!userId) return;

    dispatch(addFriendStart(+userId));
  }, [userId, dispatch, addFriendStart]);

  const renderedActions = useMemo(() => {
    return isCurrentUser ? (
      <CustomButton className="user-page__action">
        Редактировать профиль
      </CustomButton>
    ) : (
      <>
        <CustomButton inverted className="user-page__action">
          Отправить сообщение
        </CustomButton>
        <AddToFriendsButton id={userId} inverted className="user-page__action">
          Добавить в друзья
        </AddToFriendsButton>
      </>
    );
  }, [isCurrentUser, addToFriendsHandler]);

  const renderedStatus = useMemo(
    () => <UserStatus status={userPageUser?.status} editable={isCurrentUser} />,
    [isCurrentUser, userPageUser]
  );

  const renderedUserPage = useMemo(
    () =>
      userPageUser ? (
        <div className="user-page__wrapper">
          <section className="user-page__info">
            <header className="user-page__header">
              <article className="user-page__avatar-container">
                <UserAvatar
                  imageSource={userPageUser.image}
                  editable={isCurrentUser}
                />
                <div className="user-page__actions">{renderedActions}</div>
              </article>
              <div className="user-page__details">
                <h3 className="user-page__name">{userPageUser.username}</h3>
                {renderedStatus}
              </div>
            </header>
          </section>
          <main className="user-page__main">
            <UserFriends
              className="user-page__friends"
              friends={userPageUser.friends}
            />
            <section className="user-page__posts posts">
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
    if (isCurrentUser) {
      return renderedUserPage;
    }

    switch (userPageState) {
      case CHANGE_USER_STATES.FETCHING:
      case GET_USER_STATES.FETCHING:
        return (
          <p className="user-page__loading-indicator">
            <LoadingIndicator />
          </p>
        );
      case GET_USER_STATES.FAILURE:
        return <p>Owibka...</p>;
      case GET_USER_STATES.SUCCESS:
        return renderedUserPage;
    }
  }, [userPageState, userPageUser, renderedUserPage, isCurrentUser]);

  const renderedAvatarModal = useMemo(
    () => (avatarModalShown ? <UserAvatarPickerModal /> : null),
    [avatarModalShown]
  );

  if (userPageErrors?.isPageNotFound) {
    return <PageNotFound />;
  }

  return (
    <div className="user-page">
      {renderedAvatarModal}
      {renderContent()}
    </div>
  );
};

export default UserPage;
