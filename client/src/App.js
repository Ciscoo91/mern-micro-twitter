import React, { useEffect } from 'react';
import { Switch, Route, useHistory } from 'react-router-dom'
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
import Home from './components/layout/Home';
import SubscribeContextProvider from './context/SubscribeContext';
import MyHashtag from './components/tweet/MyHashtag';




const App = () => {

  // const [currentUrl, setCurrentUrl] = useState("");
  const history = useHistory();

  useEffect(() => {
    const currentUrl = localStorage.getItem('currentUrl')
    // console.log(currentUrl);
    if (currentUrl == null) {
      history.push('/')
    } else {
      history.push(currentUrl);
    }
  }, [])

  useEffect(() => {
    localStorage.setItem('currentUrl', history.location.pathname);
  }, [history.location.pathname])



  return (

    <div className="h-100 min-vh-100 d-flex flex-column h-100 bg-dark" >
      <SubscribeContextProvider>
        <AuthContextProvider>
          <Navbar />
          <div className="container mt-4 mb-4 d-flex jutify-content-between flex-column">
            <Switch>
              <Route exact path="/" component={Home} />
              <Route path="/login" component={LoginForm} />
              <Route path="/register" component={RegisterUser} />
              <PrivateRoute path="/users" component={Users} />
              <PrivateRoute path="/feed" component={Feed} />
              <PrivateRoute path="/profile/:id" component={Profile} />
              <PrivateRoute path="/myhashtag" component={MyHashtag} />
              <Route path="/logout" component={LogoutPage} />
            </Switch>
          </div>
          <Footer />
        </AuthContextProvider>
      </SubscribeContextProvider>
    </div>
  );
}

export default App;
