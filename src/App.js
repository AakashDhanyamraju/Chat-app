import React from 'react';

import { Switch } from 'react-router-dom/cjs/react-router-dom.min';
import SignIn from './pages/SignIn';
import PrivateRoute from './components/PrivateRoute'
import './styles/main.scss';
import './styles/utility.scss'
import Home from './pages/Home';
import PublicRoute from './components/PublicRoute';
import 'rsuite/dist/styles/rsuite-default.css';
import { ProfileProvider } from './context/profile.context';




function App() {
  return (
    <ProfileProvider>
    <Switch>
      <PublicRoute path="/signin">
        
        <SignIn />
      </PublicRoute>

      <PrivateRoute path='/' >
        <Home />
      </PrivateRoute>
    </Switch>
    </ProfileProvider>
  );
}

export default App;
