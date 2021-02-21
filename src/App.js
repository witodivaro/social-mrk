import { useEffect } from 'react';
import { Switch, Route } from 'react-router-dom';
import Header from './components/header/header.component';
import aminGoma from './apis/amin-goma';
import axios from 'axios';

import RegisterPage from './pages/register-page/register-page.component';

import './App.scss';

const App = () => {
  useEffect(() => {}, []);

  return (
    <div className="app">
      <Header />
      <Switch>
        <Route exact path="/" component={RegisterPage} />
      </Switch>
    </div>
  );
};

export default App;
