import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
// import axios from 'axios';

export default function Users() {

    const [users, setUsers] = useState([])

    const queryUsers = () => {
        fetch("/users").then(res => {
            return res.json();
        }).then(users => {
            setUsers(users.map(user => user))
        })
    }

    useEffect(() => {
        queryUsers()
    }, [])

    return (
        <div className="container mt-4">
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th>Username</th>
                        <th>Email</th>
                    </tr>
                </thead>
                <tbody>
                    {

                        users.map((user) => {
                            return (
                                <tr key={user._id}>
                                    <td><Link to={`/profile/${user._id}`}>{user.username}</Link></td>
                                    <td>{user.email}</td>
                                </tr>
                            )
                        })

                    }
                </tbody>
            </table>
        </div>
    )
}
