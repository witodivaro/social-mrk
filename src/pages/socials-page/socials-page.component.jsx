import './socials-page.styles.scss';
import { Route, Switch } from 'react-router-dom';
import { FaUserPlus, FaUserFriends } from 'react-icons/fa';
import { BiGroup } from 'react-icons/bi';
import { useSelector } from 'react-redux';
import { selectCurrentUserId } from '../../redux/user/user.selectors';
import Friends from '../../components/Socials/friends/friends.component';
import FriendRequests from '../../components/Socials/friend-requests/friend-requests.component';
import Subscriptions from '../../components/Socials/subscriptions/subscriptions.component';
import CustomLink from '../../components/custom-link/custom-link.component';

const SocialsPage = ({ match }) => {
  const currentUserId = useSelector(selectCurrentUserId);

  return (
    <section className="socials-page">
      <header className="socials-page__header">
        <CustomLink
          className={`socials-page__link`}
          activeClassName="socials-page__link--active"
          to="friends"
        >
          <FaUserFriends className="socials-page__link-icon" />
          <span className="socials-page__link-text">Друзья</span>
        </CustomLink>
        <CustomLink
          className="socials-page__link"
          activeClassName="socials-page__link--active"
          to="requests"
        >
          <FaUserPlus className="socials-page__link-icon" />
          <span className="socials-page__link-text">Заявки в друзья</span>
        </CustomLink>
        <CustomLink
          className="socials-page__link"
          activeClassName="socials-page__link--active"
          to="subscriptions"
        >
          <BiGroup className="socials-page__link-icon" />
          <span className="socials-page__link-text">Подписчики</span>
        </CustomLink>
      </header>
      <Switch>
        <Route
          exact
          path={`${match.path}/friends`}
          render={() => <Friends id={currentUserId} />}
        />
        <Route
          exact
          path={`${match.path}/subscriptions`}
          render={() => <Subscriptions id={currentUserId} />}
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
