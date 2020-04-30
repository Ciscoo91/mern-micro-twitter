import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import TwitCard from '../tweet/TwitCard';
import ProfileCard from './ProfileCard'
import UpdateUser from '../users/Update';
import Avatar from './Avatar';
import Subscription from './Subscription';
const Profile = () => {

    const [user, setUser] = useState([]);
    const [messages, setMessages] = useState([]);
    const { id } = useParams();


    const fetchCurrentUser = () => {
        fetch(`/users/profile/${id}`).then(res => {
            return res.json();
        }).then(user => {
            setUser(user)
        })
    }

    const fetchMsg = async () => {
        const response = await fetch(`/messages/messages/${id}`);
        const jsonResponse = await response.json();
        setMessages(jsonResponse);
    }

    useEffect(() => {
        fetchCurrentUser();
        fetchMsg();
    }, [])

    return (
        <div className="row bg-light p-3">
            <div className="col-3">
                <div className="nav flex-column nav-pills" id="v-pills-tab" role="tablist" aria-orientation="vertical">
                    <a className="nav-link active" id="v-pills-home-tab" data-toggle="pill" href="#v-pills-home" role="tab" aria-controls="v-pills-home" aria-selected="true">Posts</a>
                    <a className="nav-link" id="v-pills-profile-tab" data-toggle="pill" href="#v-pills-profile" role="tab" aria-controls="v-pills-profile" aria-selected="false">Following</a>
                    <a className="nav-link" id="v-pills-messages-tab" data-toggle="pill" href="#v-pills-messages" role="tab" aria-controls="v-pills-messages" aria-selected="false">My Infos</a>
                    <a className="nav-link" id="v-pills-settings-tab" data-toggle="pill" href="#v-pills-settings" role="tab" aria-controls="v-pills-settings" aria-selected="false">Settings</a>
                </div>
            </div>
            <div className="col-9">
                <div className="tab-content" id="v-pills-tabContent">
                    <div className="tab-pane fade show active" id="v-pills-home" role="tabpanel" aria-labelledby="v-pills-home-tab">{messages.map(msg => <TwitCard key={msg._id} message={msg} />)}</div>
                    <div className="tab-pane fade" id="v-pills-profile" role="tabpanel" aria-labelledby="v-pills-profile-tab"><Subscription /></div>
                    <div className="tab-pane fade" id="v-pills-messages" role="tabpanel" aria-labelledby="v-pills-messages-tab"><ProfileCard user={user} /></div>
                    <div className="tab-pane fade" id="v-pills-settings" role="tabpanel" aria-labelledby="v-pills-settings-tab"><div className="row justify-content-around align-items-center bg-secondary"><UpdateUser id={id} /><Avatar id={id} /></div></div>
                </div>
            </div>
        </div>
    );
}

export default Profile;