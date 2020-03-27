import React from 'react';
import { Switch, Route, BrowserRouter as Router } from 'react-router-dom'
// import "bootstrap/dist/css/bootstrap.min.css";
import LoginForm from './components/auth/LoginForm';
import RegisterUser from './components/auth/RegisterUser';
import Navbar from './components/layout/Navbar'
import Footer from './components/layout/Footer'
import Users from './components/users/Users'
import Feed from './components/tweet/Feed';
import LogoutPage from './components/auth/LogoutPage';
import PrivateRoute from './components/auth/PrivateRoute';
import Profile from './components/profile/Profile';
import AuthContextProvider from './context/AuthContext';

const App = () => {

  return (

    <div className="h-100 min-vh-100 d-flex flex-column h-100 bg-dark" >
      <AuthContextProvider>
        <Router>
          <Navbar />
          <div className="container mt-4 mb-4 d-flex jutify-content-between flex-column">
            <Switch>
              <Route path="/login" component={LoginForm} />
              <Route path="/register" component={RegisterUser} />
              <PrivateRoute path="/users" component={Users} />
              <PrivateRoute path="/feed" component={Feed} />
              <PrivateRoute path="/profile/:id" component={Profile} />
              <Route path="/logout" component={LogoutPage} />
            </Switch>
          </div>
        </Router>
        <Footer />
      </AuthContextProvider>
    </div>

  );
}

export default App;
