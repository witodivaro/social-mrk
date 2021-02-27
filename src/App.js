import { Switch, Route } from 'react-router-dom';
import Header from './components/header/header.component';

import HomePage from './pages/home-page/home-page.component';

import './App.scss';

const App = () => {
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
