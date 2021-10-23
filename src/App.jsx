import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Header from './components/header/Header';
import Main from 'components/main/Main';
import Maintenance from 'components/Maintenance/Maintenance';
import GlobalState from './context/GlobalState';

function App() {
  return (
    <Router>
      <div className='App'>
        <Header />
        <GlobalState>
          <Switch>
            <Route path='/' exact>
              <Main />
            </Route>
            <Route path='/maintenance'>
              <Maintenance />
            </Route>
          </Switch>
        </GlobalState>
      </div>
    </Router>
  );
}

export default App;
