import React, { useState, useContext, useEffect } from 'react';
import { AuthContext } from '../../context/AuthContext';
import axios from 'axios';
import TwitCard from './TwitCard';

const TwitForm = () => {

    const { user } = useContext(AuthContext)
    const [value, setValue] = useState("")
    const [messageList, setMessageList] = useState([]);
    const [error, setError] = useState({ error: false, errorMessage: "" });

    const handleSubmit = (e) => {
        e.preventDefault();
        let author = user.data.user.username;
        let author_id = user.data.user.id;
        // console.log(value.length);
        if (value.length > 140) {
            setError({ error: true, errorMessage: "Your post if too long, it can't contain more than 140 characters" })
        } else {
            // console.log("n'est pas rentrée dans la condition précédente");
            setError({ error: false, errorMessage: "" })
            axios.post('/messages/message', {
                message: value,
                author: author,
                author_id: author_id
            }, {
                headers: {
                    Authorization: `Bearer ${user.data.token}`
                }
            }).then((response) => {
                if (response.status === 200) {
                    setMessageList([response.data, ...messageList]);
                }
                setValue("");
            }).catch((error) => {
                console.log(error);
            });
        }

    }

    useEffect(() => {
        fetch("/messages/messages")
            .then(response => response.json())
            .then(data => {
                if (data !== undefined) {
                    setMessageList(data.map(msg => msg))
                }
            })
    }, [])

    return (
        <div>
            {
                error.error && <div className="alert alert-danger" role="alert">{error.errorMessage}</div>
            }
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <textarea className="form-control text-info h3"
                        name="message"
                        id="exampleFormControlTextarea1"
                        rows="3"
                        value={value}
                        onChange={(e) => setValue(e.target.value)}>
                    </textarea>
                </div>
                <button type="submit" className="btn btn-info">Post</button>
            </form>
            <div className="mt-5">
                <div className="">
                    {messageList.map(message => {
                        return <TwitCard key={message._id} message={message} />
                    })}
                </div>
            </div>
        </div>
    );
}

export default TwitForm;