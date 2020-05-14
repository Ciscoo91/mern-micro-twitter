import React, { useState, useEffect } from 'react';
import axios from 'axios';
import TwitCard from './TwitCard';


const TwitForm = ({ user }) => {

    // const { user } = useContext(AuthContext)
    const [value, setValue] = useState("")
    const [messageList, setMessageList] = useState([]);
    const [error, setError] = useState({ error: false, errorMessage: "" });

    const handleSubmit = (e) => {
        e.preventDefault();
        let author = user.username;
        let author_id = user.id;
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

    const handleInput = (e) => {
        console.log("value changed");
        setValue(e.target.value);
    }

    const fetchMessages = async (id) => {
        const response = await fetch(`/messages/feed/${id}`)
        const jsonRes = await response.json();
        setMessageList(jsonRes);
    }

    useEffect(() => {
        console.log("rendered");
        fetchMessages(user.id);
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
                        onChange={handleInput}>
                    </textarea>
                </div>
                <button type="submit" className="btn btn-info">Post</button>
            </form>
            <div className="mt-5">
                <div className="">
                    {messageList ? messageList.map(message => {
                        return <TwitCard key={message._id} message={message} />
                    }) : null}
                </div>
            </div>
        </div>
    );
}

export default TwitForm;