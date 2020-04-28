import React, { Fragment, useState, useEffect } from 'react'
import TwitCard from './TwitCard';

const MyHashtag = () => {


    const [messages, setMessages] = useState([]);
    const [filteredMessage, setFilteredMessage] = useState([]);

    const fetchMsg = async () => {
        const response = await fetch(`/messages/messages`);
        const jsonRes = await response.json();
        setMessages(jsonRes);
    }


    const filterMessageByHashtag = (message) => {
        const arrayMsg = message.message.split(' ');
        if (arrayMsg.includes("#myhashtag")) {
            return message;
        }
    }

    useEffect(() => {
        fetchMsg();


    }, []);

    useEffect(() => {
        const filter = messages.filter(message => {
            let filtered = filterMessageByHashtag(message);
            return filtered;
        });
        setFilteredMessage(filter);

    }, [messages])

    return (
        <Fragment>
            <div>
                {filteredMessage.map(message => <TwitCard key={message._id} message={message} />)}
            </div>
        </Fragment>
    );
}

export default MyHashtag;