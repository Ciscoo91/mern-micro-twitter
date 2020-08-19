import React, { useState, Fragment } from 'react'

const UpdateUser = ({ id }) => {

    const [username, setUsername] = useState(null);
    const [email, setEmail] = useState(null);
    const [password, setPassword] = useState(null);
    const [passwordConfirm, setPasswordConfirm] = useState(null);


    const handleSubmit = async (e) => {
        e.preventDefault();
        const body = { username, password, password_confirm: passwordConfirm, email }
        const response = await fetch(`/users/update/${id}`, {
            method: "PUT",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(body)
        })

        const jsonResponse = await response.json();

        // console.log(jsonResponse);
    }

    return (
        <Fragment>
            <button type="button" className="btn btn-primary col-3 btn-sm" data-toggle="modal" data-target="#exampleModal" data-whatever="@mdo">Update My Account</button>

            <div className="modal fade" id="exampleModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">New Credentials</h5>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            <form className="form mt-4" onSubmit={handleSubmit}>
                                <div className="form-group">
                                    <label htmlFor="">Username</label>
                                    <input type="text" className="form-control" name="username" onChange={(e) => { setUsername(e.target.value) }} />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="">Email</label>
                                    <input type="text" className="form-control" name="email" onChange={(e) => { setEmail(e.target.value) }} />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="">Password</label>
                                    <input type="password" className="form-control" name="password" onChange={(e) => { setPassword(e.target.value) }} />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="">Confirm Password</label>
                                    <input type="password" className="form-control" name="password_confirm" onChange={(e) => { setPasswordConfirm(e.target.value) }} />
                                </div>
                                <div className="form-group">
                                    <button type="submit" className="btn btn-success">Update</button>
                                </div>
                            </form>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    )
}

export default UpdateUser;