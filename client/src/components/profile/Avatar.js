import React, { useState, Fragment } from 'react'
// import { v4 as uuidv4 } from 'uuid'
import axios from 'axios'


const Avatar = ({ id }) => {

    const [file, setFile] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(file);
        // const splitedName = file.name.split('.');
        // splitedName[0] = uuidv4();
        // const v4name = splitedName.join('.');
        // console.log(v4name);
        const formData = new FormData();
        formData.append('avatar', file);

        const response = await axios.post('/avatar/upload', formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });

    }

    return (
        <Fragment>
            <form className="col-6" onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="exampleFormControlFile1">Example file input</label>
                    <input type="file" className="form-control-file mb-2" id="exampleFormControlFile1" onChange={(e) => setFile(e.target.files[0])} />
                    <input type="submit" value="Upload" className="btn btn-sm btn-primary" />
                </div>
            </form>
        </Fragment>
    );
}

export default Avatar;