import { Link } from 'react-router-dom';

import './header.styles.scss';

const Header = () => {
  return (
    <header className="header">
      <div className="header__wrapper">
        <p className="header__logo-container">МРК СОЦИАЛ</p>
        <nav className="header__navigation navigation">
          <ul className="navigation__list">
            <li className="navigation__item">
              <Link className="navigation__link" to="/">
                Регистрация
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
