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
            <Link className="navbar-brand" to="/">Microbloggos</Link>
            <div className="collapse navbar-collapse" id="navbarTogglerDemo03">
                <ul className="navbar-nav mr-auto mt-2 mt-lg-0 d-flex flex-row justify-content-end">
                    {user.isLoggedIn && (<Link className="nav-link text-light" to="/users">Users</Link>)}
                    {user.isLoggedIn && (<Link className="nav-link text-light" to="/feed">Feed</Link>)}
                    {user.isLoggedIn && (<Link className="nav-link text-light" to={`/profile/${user.data.user.id}`}>Profile</Link>)}
                    {!user.isLoggedIn && (<Link className="nav-link text-light" to="/register">Register</Link>)}
                    {user.isLoggedIn && (<span className="nav-link text-light" onClick={() => logOut()}>Logout</span>)}
                    {!user.isLoggedIn && (<Link className="nav-link text-light" to="/login">Login</Link>)}
                </ul>
            </div>
        </nav>
    )
}

export default Navbar