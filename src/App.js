import './App.scss';
import { Switch, Route, Redirect } from 'react-router-dom';
import { useCallback, useEffect, useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectToken, selectCurrentUser } from './redux/user/user.selectors';
import { getCurrentUserStart } from './redux/user/user.actions';

import Header from './components/header/header.component';
import HomePage from './pages/home-page/home-page.component';
import UserPage from './pages/user-page/user-page.component';
import SideBar from './components/side-bar/side-bar.component';
import SocialsPage from './pages/socials-page/socials-page.component';

import { ErrorBoundary } from 'react-error-boundary';
import ErrorPage from './pages/error-page/error-page.component';

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

  const renderSocialsPage = useCallback(
    (props) => {
      if (currentUser) {
        return <SocialsPage {...props} />;
      }

      return <Redirect to="/" />;
    },
    [currentUser]
  );

  useEffect(() => {
    if (token) {
      dispatch(getCurrentUserStart(token));
    }
  }, [token]);

  return (
    <div className="app" style={{ overflowY: 'hidden' }}>
      <Header />
      <div className="page-wrapper">
        <Switch>
          <Route exact path="/" component={null} />
          <Route path="/" component={SideBar} />
        </Switch>
        <ErrorBoundary FallbackComponent={ErrorPage}>
          <Switch>
            <Route exact path="/" render={renderHomePage} />
            <Route exact path="/id:userId" component={UserPage} />
            <Route path="/socials" render={renderSocialsPage} />
          </Switch>
        </ErrorBoundary>
      </div>
    </div>
  );
};

export default App;
