import './home-page.styles.scss';

import Register from '../../components/register/register.component';
import Login from '../../components/login/login.component';

const HomePage = () => {
  return (
    <div className="home">
      <div className="home__auth">
        <Login />
        <Register />
      </div>
    </div>
  );
};

export default HomePage;
