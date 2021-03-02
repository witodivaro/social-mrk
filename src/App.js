import './App.scss';
import { Switch, Route, Redirect } from 'react-router-dom';
import { useCallback, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectToken, selectCurrentUser } from './redux/user/user.selectors';
import { getCurrentUserStart } from './redux/user/user.actions';

import Header from './components/header/header.component';
import HomePage from './pages/home-page/home-page.component';
import UserPage from './pages/user-page/user-page.component';

const App = () => {
  const token = useSelector(selectToken);
  const dispatch = useDispatch();
  const currentUser = useSelector(selectCurrentUser);

  const renderHomePage = useCallback(
    (props) => {
      if (currentUser) {
        return <Redirect to={`/id${currentUser.id}`} />;
      }

      return <HomePage {...props} />;
    },
    [currentUser]
  );

  const renderUserPage = useCallback(
    (props) => {
      if (token) {
        return <UserPage {...props} />;
      }

      return <Redirect to="/" />;
    },
    [token]
  );

  useEffect(() => {
    if (token) {
      dispatch(getCurrentUserStart(token));
    }
  }, [token]);

  return (
    <div className="app">
      <Header />
      <Switch>
        <Route exact path="/" render={renderHomePage} />
        <Route exact path="/id:userId" render={renderUserPage} />
      </Switch>
    </div>
  );
};

export default App;
