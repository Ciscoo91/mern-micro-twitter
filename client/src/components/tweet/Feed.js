import React, { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import TwitForm from './TwitForm';

const Feed = () => {

    const { user } = useContext(AuthContext);
    return user.isLoggedIn ? (<TwitForm user={user.data.user} />) : (<div>You are logged out</div>);
}

export default Feed;