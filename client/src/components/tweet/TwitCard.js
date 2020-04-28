import React, { useContext, useState, useEffect, Fragment } from 'react'
import { Link } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from '../../context/AuthContext'
import EditTwitt from '../tweet/Edit';
import moment from 'moment'


export const seekHashtag = (message) => {

    const arrayMessage = message.split(' ');

    if (arrayMessage.includes('#myhashtag')) {

        let indexOfHashtag = arrayMessage.indexOf("#myhashtag");
        let first = arrayMessage.splice(0, indexOfHashtag);
        let second = arrayMessage.splice(indexOfHashtag + 1)
        let firstString = first.join(' ');
        let secondString = second.join(' ');
        return (
            <Fragment>
                {firstString} <Link className="text-warning" to="/myhashtag">#myhashtag</Link> {secondString}
            </Fragment>
        )
    }

    return message;
}


const TwitCard = ({ message }) => {


    const [imageUrl, setImageUrl] = useState(null);
    const fetchAvatar = async (id) => {
        const response = await axios.get(`/avatar/${id}`);
        setImageUrl(response.data[0].avatar_url);
    }

    useEffect(() => {
        fetchAvatar(message.author_id);
    })

    const { user } = useContext(AuthContext);
    return (
        <div className="row mt-4 bg-info text-light">
            <div className="media p-3">
                {/* <img src="https://via.placeholder.com/64" className="mr-3" alt="" /> */}
                {/* <img src={randomElement} style={{ "width": "64px", "height": "64px" }} className="mr-3" alt="" /> */}
                {imageUrl ? (<img src={imageUrl} alt="profile_picture" style={{ "width": "64px", "height": "64px" }} className="mr-3" />) : (<img src="https://via.placeholder.com/64" style={{ "width": "64px", "height": "64px" }} className="mr-3" alt="" />)}
                <div className="media-body">
                    <h5 className="mt-0 text-warning"><Link className="text-warning" to={`/profile/${message.author_id}`}> {message.author}</Link></h5>
                    <p>{seekHashtag(message.message)}</p>
                    <p className="font-weight-lighter">{moment(message.created_at).format('DD-MM-YYYY')}</p>
                    {user.data.user.id === message.author_id ? <EditTwitt message={message} /> : null}
                </div>
            </div>
        </div>
    );
}

export default TwitCard;