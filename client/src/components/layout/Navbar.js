import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';

const Navbar = () => {

    const { user, logOut } = useContext(AuthContext);

    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-warning mb-4">
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarTogglerDemo03"
                aria-controls="navbarTogglerDemo03" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
            <Link className="navbar-brand" to="/">MERN Micro Twitter</Link>
            <div className="collapse navbar-collapse" id="navbarTogglerDemo03">
                <ul className="navbar-nav mr-auto mt-2 mt-lg-0">
                    {user.isLoggedIn && (<Link className="nav-link text-info" to="/users">Users</Link>)}
                    {user.isLoggedIn && (<Link className="nav-link text-info" to="/feed">Feed</Link>)}
                    {user.isLoggedIn && (<Link className="nav-link text-info" to={`/profile/${user.data.user.id}`}>Profile</Link>)}
                    {!user.isLoggedIn && (<Link className="nav-link text-info" to="/register">Register</Link>)}
                    {user.isLoggedIn && (<span className="nav-link text-info" onClick={() => logOut()}>Logout</span>)}
                    {!user.isLoggedIn && (<Link className="nav-link text-info" to="/login">Login</Link>)}
                </ul>
            </div>
        </nav>
    )
}

export default Navbar