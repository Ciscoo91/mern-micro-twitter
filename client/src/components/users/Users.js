import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import { SubscribeContext } from '../../context/SubscribeContext';

export default function Users() {

    const [users, setUsers] = useState([])
    const { follow } = useContext(SubscribeContext);

    const queryUsers = () => {
        fetch("/users").then(res => {
            return res.json();
        }).then(users => {
            setUsers(users.map(user => user))
        })
    }

    useEffect(() => {
        queryUsers();
    }, [])

    return (
        <div className="container mt-4">
            <table className="table table-striped bg-light">
                <thead>
                    <tr>
                        <th>Username</th>
                        <th>Email</th>
                        <th>Subscribe</th>
                        <th>id</th>
                    </tr>
                </thead>
                <tbody>
                    {

                        users.map((user) => {
                            return (
                                <tr key={user._id}>
                                    <td><Link to={`/profile/${user._id}`}>{user.username}</Link></td>
                                    <td>{user.email}</td>
                                    <td><button className="btn btn-primary btn-sm" onClick={() => follow(user._id)}>Subscribe</button></td>
                                    <td>{user._id}</td>
                                </tr>
                            )
                        })

                    }
                </tbody>
            </table>
        </div>
    )
}
