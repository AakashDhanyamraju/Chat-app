import React from 'react';

import { Switch } from 'react-router-dom/cjs/react-router-dom.min';
import SignIn from './pages/SignIn';
import PrivateRoute from './components/PrivateRoute'
import './styles/main.scss'
import Home from './pages/Home';
import PublicRoute from './components/PublicRoute';

function App() {
  return (
    <Switch>
      <PublicRoute path="/signin">
        <SignIn />
      </PublicRoute>

      <PrivateRoute path='/' >
        <Home />
      </PrivateRoute>
    </Switch>
  );
}

export default App;
