import './side-bar.styles.scss';

import React from 'react';
import { Link } from 'react-router-dom';
import { FaUser, FaNewspaper, FaUsers, FaEnvelope } from 'react-icons/fa';

const SideBar = () => {
  return (
    <div className="side-bar">
      <p className="side-bar__link-container">
        <Link className="side-bar__link">
          <FaUser className={'side-bar__icon'} />
          <span className="side-bar__text">Мой профиль</span>
        </Link>
      </p>
      <p className="side-bar__link-container">
        <Link className="side-bar__link">
          <FaNewspaper className={'side-bar__icon'} />
          <span className="side-bar__text">Новости</span>
        </Link>
      </p>
      <p className="side-bar__link-container">
        <Link className="side-bar__link">
          <FaEnvelope className={'side-bar__icon'} />
          <span className="side-bar__text">Сообщения</span>
        </Link>
      </p>
      <p className="side-bar__link-container">
        <Link className="side-bar__link">
          <FaUsers className={'side-bar__icon'} />
          <span className="side-bar__text">Друзья</span>
        </Link>
      </p>
    </div>
  );
};

export default SideBar;
