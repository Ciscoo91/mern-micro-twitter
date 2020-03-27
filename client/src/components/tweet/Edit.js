import React, { useState, Fragment, useContext } from 'react'
import { AuthContext } from '../../context/AuthContext';

const EditTwitt = ({ message }) => {

    const { user } = useContext(AuthContext);
    const [tweet, setTweet] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(message);
        const response = await fetch(`/messages/update/${message._id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                message: tweet,
                author: user.data.user.username,
                author_id: user.data.user.id
            })
        });

        const jsonResponse = await response.json();
        console.log(jsonResponse);

    }

    return (
        <Fragment>
            <button type="button" className="btn btn-primary" data-toggle="modal" data-target="#exampleModal" data-whatever="@mdo">Edit</button>

            <div className="modal fade" id="exampleModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title text-info" id="exampleModalLabel">Edit Message</h5>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            <form onSubmit={handleSubmit}>
                                <div className="form-group">
                                    <input type="text" className="form-control" id="recipient-name" onChange={(e) => setTweet(e.target.value)} />
                                </div>
                                <input type="submit" className="btn btn-primary" value="Edit" />
                            </form>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                            <button type="button" className="btn btn-primary">Send message</button>
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    );
}

export default EditTwitt;