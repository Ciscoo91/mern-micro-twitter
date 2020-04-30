import React, { useState, useEffect, useContext } from 'react'
import { Link } from 'react-router-dom';
import { SubscribeContext } from '../../context/SubscribeContext';


function Subscription() {

    const { unFollow, getIdOfCurrentUser } = useContext(SubscribeContext);
    const [subscribes, setSubscribes] = useState([]);
    const [usersWithInfo, setUsersWithInfo] = useState([])
    const getSubscribedUsersInfo = () => {
        let usersArray = [];
        if (subscribes == null) {
            return;
        }
        usersArray = subscribes.map(async (userId) => {
            const response = await fetch(`/users/profile/${userId}`)
            const jsonRes = await response.json();
            console.log(jsonRes);
            return jsonRes;
        })
        setUsersWithInfo(prevState => [...prevState, usersArray])
    }
    const getSubscribes = async () => {
        const id = getIdOfCurrentUser();
        const response = await fetch(`/users/subscribes/${id}`);
        const resJson = await response.json();
        setSubscribes(resJson.subscribes)
        console.log(resJson);
    }

    const getUsers = async () => {
        let getSub = await getSubscribes();
        let setUsersInfo = await getSubscribedUsersInfo();
    }

    useEffect(() => {
        getUsers();
    }, [])




    return (
        <div>
            <table className="table table-striped bg-light">
                <thead>
                    <tr>
                        <th>Username</th>
                        <th>Email</th>
                        <th>unSubscribe</th>
                        <th>id</th>
                    </tr>
                </thead>
                <tbody>
                    {console.log(usersWithInfo)}
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
