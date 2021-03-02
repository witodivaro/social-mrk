import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { signOut } from '../../redux/user/user.actions';
import { selectCurrentUser } from '../../redux/user/user.selectors';

import './header.styles.scss';

const Header = () => {
  const currentUser = useSelector(selectCurrentUser);
  const dispatch = useDispatch();

  const signOutHandler = () => {
    dispatch(signOut());
  };

  const renderedAuthentication = currentUser ? (
    <button className="navigation__button" onClick={signOutHandler}>
      Выйти
    </button>
  ) : (
    <Link className="navigation__link" to="/">
      Регистрация
    </Link>
  );

  return (
    <header className="header">
      <div className="header__wrapper">
        <p className="header__logo-container">МРК СОЦИАЛ</p>
        <nav className="header__navigation navigation">
          <ul className="navigation__list">
            <li className="navigation__item">{renderedAuthentication}</li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
