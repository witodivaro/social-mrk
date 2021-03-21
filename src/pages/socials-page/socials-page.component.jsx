import './socials-page.styles.scss';
import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { FaUserPlus, FaUserFriends } from 'react-icons/fa';
import { BiGroup } from 'react-icons/bi';
import { useSelector } from 'react-redux';
import { selectCurrentUser } from '../../redux/user/user.selectors';
import Friends from '../../components/Socials/friends/friends.component';
import FriendRequests from '../../components/Socials/friend-requests/friend-requests.component';
import Subscriptions from '../../components/Socials/subscriptions/subscriptions.component';
import CustomLink from '../../components/custom-link/custom-link.component';

const SocialsPage = ({ match }) => {
  const currentUser = useSelector(selectCurrentUser);

  return (
    <section className="socials-page">
      <header className="socials-page__header">
        <CustomLink
          className={`socials-page__link`}
          activeClassName="socials-page__link--active"
          to={{
            pathname: 'friends',
            state: {
              id: currentUser.id,
            },
          }}
        >
          <FaUserFriends className="socials-page__link-icon" />
          <span className="socials-page__link-text">Друзья</span>
        </CustomLink>
        <CustomLink
          className="socials-page__link"
          activeClassName="socials-page__link--active"
          to={{
            pathname: 'requests',
            state: {
              id: currentUser.id,
            },
          }}
        >
          <FaUserPlus className="socials-page__link-icon" />
          <span className="socials-page__link-text">Заявки в друзья</span>
        </CustomLink>
        <CustomLink
          className="socials-page__link"
          activeClassName="socials-page__link--active"
          to={{
            pathname: 'subscriptions',
            state: {
              id: currentUser.id,
            },
          }}
        >
          <BiGroup className="socials-page__link-icon" />
          <span className="socials-page__link-text">Подписчики</span>
        </CustomLink>
      </header>
      <Switch>
        <Route exact path={`${match.path}/friends`} component={Friends} />
        <Route
          exact
          path={`${match.path}/subscriptions`}
          component={Subscriptions}
        />
        <Route
          exact
          path={`${match.path}/requests`}
          component={FriendRequests}
        />
      </Switch>
    </section>
  );
};

export default SocialsPage;
