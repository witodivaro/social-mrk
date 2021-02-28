import './user-page.styles.scss';

import React from 'react';
import { useRouteMatch } from 'react-router-dom';
import { BiUserPlus } from 'react-icons/bi';
import CustomButton from '../../components/custom-button/custom-button.component';

import UserAvatar from '../../components/user-avatar/user-avatar.component';

const UserPage = () => {
  const match = useRouteMatch();

  return (
    <div className="user">
      <div className="user__wrapper">
        <section className="user__info">
          <header className="user__header">
            <p className="user__actions">
              <UserAvatar />
              <CustomButton className="user__action">
                Добавить в друзья
              </CustomButton>
              <CustomButton className="user__action">
                Отправить сообщение
              </CustomButton>
            </p>
            <div className="user__details">
              <h3 className="user__name">USERNAME</h3>
              <p className="user__status">STATUS</p>
            </div>
          </header>
        </section>
        <main className="user__main">
          <article className="user__friends friends">
            <h3 className="friends__title">Friends (3)</h3>
            <ul className="friends__list">
              <li className="friends__item">
                <p className="friends__avatar">FRIEND AVATAR</p>
                <span className="friends__name">FRIEND NAME</span>
                <button className="friends__add-button">ADD TO FRIENDS</button>
              </li>
              <li className="friends__item">
                <p className="friends__avatar">FRIEND AVATAR</p>
                <span className="friends__name">FRIEND NAME</span>
                <button className="friends__add-button">ADD TO FRIENDS</button>
              </li>
              <li className="friends__item">
                <p className="friends__avatar">FRIEND AVATAR</p>
                <span className="friends__name">FRIEND NAME</span>
                <button className="friends__add-button">ADD TO FRIENDS</button>
              </li>
            </ul>
          </article>
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
