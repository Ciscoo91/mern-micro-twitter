import React, { useState } from 'react'
import axios from 'axios'
import { useHistory } from 'react-router-dom'



const RegisgertUser = () => {

    const [username, setUsername] = useState(null);
    const [email, setEmail] = useState(null);
    const [password, setPassword] = useState(null);
    const [passwordConfirm, setPasswordConfirm] = useState(null);
    const history = useHistory();

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post('/users/register', {
            username: username,
            password: password,
            password_confirm: passwordConfirm,
            email: email,
        }).then((response) => {
            history.push('/login')
        }).catch((error) => {
            console.log(error);
        });
    }

    return (
        <div className="container col-md-6">
            <form className="form mt-4" onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="">Username</label>
                    <input type="text" className="form-control" name="username" onChange={(e) => { setUsername(e.target.value) }} />
                </div>
                <div className="form-group">
                    <label htmlFor="">Email</label>
                    <input type="text" className="form-control" name="email" onChange={(e) => { setEmail(e.target.value) }} />
                </div>
                <div className="form-group">
                    <label htmlFor="">Password</label>
                    <input type="password" className="form-control" name="password" onChange={(e) => { setPassword(e.target.value) }} />
                </div>
                <div className="form-group">
                    <label htmlFor="">Confirm Password</label>
                    <input type="password" className="form-control" name="password_confirm" onChange={(e) => { setPasswordConfirm(e.target.value) }} />
                </div>
                <div className="form-group">
                    <button type="submit" className="btn btn-success">Register</button>
                </div>
            </form>
        </div>
    );
}

export default RegisgertUser;