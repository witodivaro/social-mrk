import './App.scss';
import { Switch, Route, Redirect } from 'react-router-dom';
import { useCallback, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectToken, selectCurrentUser } from './redux/user/user.selectors';
import { getCurrentUserStart } from './redux/user/user.actions';

import Header from './components/header/header.component';
import HomePage from './pages/home-page/home-page.component';
import UserPage from './pages/user-page/user-page.component';
import SideBar from './components/side-bar/side-bar.component';

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

  useEffect(() => {
    if (token) {
      dispatch(getCurrentUserStart(token));
    }
  }, [token]);

  return (
    <div className="app" style={{ overflowY: 'hidden' }}>
      <Header />
      <div className="page-wrapper">
        <SideBar />
        <Switch>
          <Route exact path="/" render={renderHomePage} />
          <Route exact path="/id:userId" component={UserPage} />
        </Switch>
      </div>
    </div>
  );
};

export default App;
