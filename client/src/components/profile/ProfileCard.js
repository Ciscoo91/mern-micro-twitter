import React, { Fragment } from 'react';
import userImg from './userImg.svg';

const ProfileCard = ({ user }) => {
    return (
        <Fragment>
            <div className="card mb-3" style={{ "maxWidth": "540px" }}>
                <div className="row no-gutters">
                    <div className="col-md-4">
                        <img src={userImg} className="card-img" alt="..." />
                    </div>
                    <div className="col-md-8">
                        <div className="card-body">
                            <h5 className="card-title">{user.username}</h5>
                            <p className="card-text">Email: {user.email}</p>
                            <p className="card-text"><small className="text-muted">Last updated 3 mins ago</small></p>
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    );
}

export default ProfileCard;