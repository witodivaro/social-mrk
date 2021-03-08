import './side-bar.styles.scss';

import React, { useMemo } from 'react';
import { Link } from 'react-router-dom';
import {
  FaUser,
  FaNewspaper,
  FaUsers,
  FaEnvelope,
  FaUserPlus,
  FaSignInAlt,
} from 'react-icons/fa';
import { useSelector } from 'react-redux';
import { selectCurrentUser } from '../../redux/user/user.selectors';

const SideBar = () => {
  const currentUser = useSelector(selectCurrentUser);

  const renderedSideBarContent = useMemo(() =>
    currentUser ? (
      <>
        <p className="side-bar__link-container">
          <Link className="side-bar__link" to="/">
            <FaUser className={'side-bar__icon'} />
            <span className="side-bar__text">Мой профиль</span>
          </Link>
        </p>
        <p className="side-bar__link-container">
          <Link className="side-bar__link" to="/feed">
            <FaNewspaper className={'side-bar__icon'} />
            <span className="side-bar__text">Новости</span>
          </Link>
        </p>
        <p className="side-bar__link-container">
          <Link className="side-bar__link" to="/messages">
            <FaEnvelope className={'side-bar__icon'} />
            <span className="side-bar__text">Сообщения</span>
          </Link>
        </p>
        <p className="side-bar__link-container">
          <Link className="side-bar__link" to="/socials/friends">
            <FaUsers className={'side-bar__icon'} />
            <span className="side-bar__text">Друзья</span>
          </Link>
        </p>
      </>
    ) : (
      <p className="side-bar__link-container">
        <Link className="side-bar__link" to="/">
          <FaSignInAlt className={'side-bar__icon'} />
          <span className="side-bar__text">Вход</span>
        </Link>
        <Link className="side-bar__link" to="/">
          <FaUserPlus className={'side-bar__icon'} />
          <span className="side-bar__text">Регистрация</span>
        </Link>
      </p>
    )
  );

  return <div className="side-bar">{renderedSideBarContent}</div>;
};

export default SideBar;
