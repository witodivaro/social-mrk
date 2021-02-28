import './user-page.styles.scss';

import React, { useEffect, useMemo } from 'react';
import { useRouteMatch } from 'react-router-dom';
import CustomButton from '../../components/custom-button/custom-button.component';

import UserAvatar from '../../components/user-components/user-avatar/user-avatar.component';
import UserFriends from '../../components/user-components/user-friends/user-friends.component';
import { useSelector } from 'react-redux';
import { selectToken } from '../../redux/user/user.selectors';
import getUser from '../../apis/get-user';

const UserPage = () => {
  const match = useRouteMatch();
  const token = useSelector(selectToken);
  //   useEffect(() => {
  //     const pageId = match.params.userId;
  //     getUser(token, pageId).then((res) => console.log(res));
  //   }, []);

  return (
    <div className="user">
      <div className="user__wrapper">
        <section className="user__info">
          <header className="user__header">
            <div className="user__actions">
              <UserAvatar />
              <CustomButton inverted className="user__action">
                Отправить сообщение
              </CustomButton>
              <CustomButton inverted className="user__action">
                Добавить в друзья
              </CustomButton>
            </div>
            <div className="user__details">
              <h3 className="user__name">USERNAME</h3>
              <p className="user__status">STATUS</p>
            </div>
          </header>
        </section>
        <main className="user__main">
          <UserFriends className="user__friends" />
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
    </div>
  );
};

export default UserPage;
