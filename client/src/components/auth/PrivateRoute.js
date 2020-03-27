import React, { useContext } from 'react'
import { AuthContext } from '../../context/AuthContext';
import { Route, Redirect } from 'react-router-dom';

const PrivateRoute = ({ component: Component, ...rest }) => {

    const { user } = useContext(AuthContext);

    return (
        <Route {...rest} render={(routeProps) => (
            user.isLoggedIn ? <Component {...routeProps} /> : <Redirect to="/" />
        )} />
    );
}

export default PrivateRoute;