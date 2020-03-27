import React, { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import TwitForm from './TwitForm';

const Feed = () => {

    const { user } = useContext(AuthContext);
    return user.isLoggedIn ? (<TwitForm />) : (<div>You are logged out</div>);
}

export default Feed;