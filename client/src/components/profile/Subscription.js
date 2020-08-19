import React, { useState, useEffect, useContext } from 'react'
import { Link } from 'react-router-dom';
import { SubscribeContext } from '../../context/SubscribeContext';


function Subscription() {

    const { unFollow, getIdOfCurrentUser } = useContext(SubscribeContext);
    const [usersWithInfo, setUsersWithInfo] = useState([])


    const getInfo = async (id) => {
        const response = await fetch(`/users/profile/${id}`);
        const resJson = await response.json();
        setUsersWithInfo(prevState => [...prevState, resJson]);
    }

    const getSubscribes = async () => {
        const id = getIdOfCurrentUser();
        const response = await fetch(`/users/subscribes/${id}`);
        const resJson = await response.json();
        // console.log(resJson);
        resJson.map(userId => getInfo(userId))
    }


    useEffect(() => {
        getSubscribes();
    }, [])


    return (
        <div>
            <table className="table table-striped bg-light">
                <thead>
                    <tr>
                        <th>Username</th>
                        <th>Email</th>
                        <th>Subscription</th>
                        <th>id</th>
                    </tr>
                </thead>
                <tbody>
                    {

                        usersWithInfo.map((user, index) => {
                            return (
                                <tr key={index}>
                                    <td><Link to={`/profile/${user._id}`}>{user.username}</Link></td>
                                    <td>{user.email}</td>
                                    <td><button className="btn btn-danger btn-sm" onClick={() => unFollow(user._id)}>unSubscribe</button></td>
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

export default Subscription
