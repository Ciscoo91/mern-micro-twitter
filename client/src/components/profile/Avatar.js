import React, { useState, Fragment } from 'react'
import { storage } from '../../firebase';
import axios from 'axios'


const Avatar = ({ id }) => {

    const [image, setImage] = useState(null);
    const [imageUrl, setImageUrl] = useState("");
    const [progress, setProgress] = useState(null);
    const [error, setError] = useState("");


    const handleChange = (e) => {

        const file = e.target.files[0];
        console.log(file);
        if (file) {
            const fileType = file.type;
            const validTypes = ["image/jpg", "image/jpeg", "image/png", "image/gif"]

            if (validTypes.includes(fileType)) {
                setImage(file);
            } else {
                setError("This format is not authorized, authorized formats are: jpg, jpeg, png, gif")
            }

        }
    }

    const handleUpload = (e) => {
        e.preventDefault();
        if (image) {
            const uploadTask = storage.ref(`images/${image.name}`).put(image)
            console.log(uploadTask);

            uploadTask.on('state_changed', snapshot => {
                const progress = Math.round(
                    (snapshot.bytesTransferred / snapshot.totalBytes) * 100
                );

                setProgress(progress);
            }, error => {
                // setError(error);
                console.log(error);
            }, () => {
                storage
                    .ref("images")
                    .child(image.name)
                    .getDownloadURL()
                    .then(url => {
                        console.log(url)
                        setImageUrl(url);
                        setProgress(0);
                        const response = axios.post('/avatar/upload', {
                            body: {

                            }
                        });
                    });
            });
        } else {
            setError("Error please choose an image to upload");
        }
    }

    return (
        <Fragment>
            <form className="col-6">
                <div className="form-group">
                    <label htmlFor="exampleFormControlFile1">Example file input</label>
                    <input type="file" className="form-control-file mb-2" id="exampleFormControlFile1" onChange={handleChange} />
                    <button onClick={handleUpload} className="btn btn-sm btn-primary">Upload</button>
                </div>
            </form>
        </Fragment>
    );
}

export default Avatar;