import './socials-page.styles.scss';
import React, { useCallback, useEffect } from 'react';
import UsersList from '../../components/users-list/users-list.component';
import { Link, Route, Switch } from 'react-router-dom';
import { FaUserPlus, FaUserFriends } from 'react-icons/fa';
import { SOCIAL_PAGE_STATES } from '../../config/socials-states';

const mockUsers = [
  {
    username: 'Kek',
    id: 3,
  },
  {
    username: 'lel',
    id: 4,
  },
  { username: 'Test', id: 1 },
  { username: 'Wito', id: 2 },
];

const SocialsPage = () => {
  return (
    <section className="socials-page">
      <header className="socials-page__header">
        <Link className={`socials-page__link`} to="friends">
          <FaUserFriends className="socials-page__link-icon" />
          <span className="socials-page__link-text">Друзья</span>
        </Link>
        <Link className="socials-page__link" to="requests">
          <FaUserPlus className="socials-page__link-icon" />
          <span className="socials-page__link-text">Заявки в друзья</span>
        </Link>
        <Link className="socials-page__link" to="subscriptions">
          <FaUserPlus className="socials-page__link-icon" />
          <span className="socials-page__link-text">Подписчики</span>
        </Link>
      </header>
      <Switch>
        <Route />
        <Route />
        <Route />
      </Switch>
    </section>
  );
};

export default SocialsPage;
