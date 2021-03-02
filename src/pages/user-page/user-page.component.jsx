import "./user-page.styles.scss";

import React, { useEffect, useState } from "react";
import CustomButton from "../../components/custom-button/custom-button.component";

import UserAvatar from "../../components/user-components/user-avatar/user-avatar.component";
import UserFriends from "../../components/user-components/user-friends/user-friends.component";
import { useSelector } from "react-redux";
import { selectToken } from "../../redux/user/user.selectors";
import getUser from "../../apis/get-user";

const UserPage = ({ match }) => {
  const token = useSelector(selectToken);

  const [username, setUsername] = useState("");
  const [status, setStatus] = useState("");
  const [isLoading, setIsLoading] = useState(true);


  useEffect(() => {
    const pageId = match.params.userId;
    getUser(token, pageId).then((res) => {
      const { user } = res.data;
      setUsername(user.username);
      setStatus(user.status);
      setIsLoading(false);
    });
  }, []);

  const renderedContent = isLoading ? (
    <p>Loading...</p>
  ) : (
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
              <h3 className="user__name">{username}</h3>
              <p className="user__status">{status}</p>
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
    );

  return <div className="user">{renderedContent}</div>;
};

export default UserPage;
