import React, { useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from '../../context/AuthContext';



const LoginForm = () => {

    const { logIn } = useContext(AuthContext);
    const [username, setUsername] = useState(null);
    const [password, setPassword] = useState(null);
    let history = useHistory();


    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post('/users/login', {
            username: username,
            password: password,
        }).then((response) => {

            if (response.data.length !== 0) {
                let authData = response.data;
                console.log(authData);
                logIn(authData);
                window.localStorage.setItem('authData', JSON.stringify(authData));
                history.push('/feed');
            }
        }).catch((error) => {
            console.log(error);
        });

    }

    return (
        <div className="container col-sm-6">
            <form onSubmit={handleSubmit} className="form">
                <div className="form-group">
                    <label htmlFor="" className="text-light">Username</label>
                    <input type="text" name="username" className="form-control text-info" onChange={(e) => setUsername(e.target.value)} />
                </div>
                <div className="form-group">
                    <label htmlFor="" className="text-light">Password</label>
                    <input type="password" name="password" className="form-control text-info" onChange={(e) => setPassword(e.target.value)} />
                </div>
                <div className="form-group">
                    <button className="btn btn-primary" type="submit">Login</button>
                </div>
            </form>
        </div>
    );
}

export default LoginForm;


