import { useEffect } from 'react';
import { Switch, Route } from 'react-router-dom';
import Header from './components/header/header.component';
import aminGoma from './apis/amin-goma';
import axios from 'axios';

import HomePage from './pages/home-page/home-page.component';

import './App.scss';

const App = () => {
  useEffect(() => {}, []);

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
