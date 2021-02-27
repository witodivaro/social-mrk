import { Switch, Route } from 'react-router-dom';
import Header from './components/header/header.component';

import HomePage from './pages/home-page/home-page.component';

import './App.scss';
import { useSelector } from 'react-redux';
import { selectToken } from './redux/user/user.selectors';

const App = () => {
  const token = useSelector(selectToken);

  return (
    <div className="app">
      <Header />
      <Switch>
        <Route exact path="/" component={HomePage} />
      </Switch>
    </div>
  );
};

export default App;
