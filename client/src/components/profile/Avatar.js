import React, { useState, Fragment } from 'react'
import { storage } from '../../firebase';
import axios from 'axios'


const Avatar = ({ id }) => {

    const [image, setImage] = useState(null);
    const [imageUrl, setImageUrl] = useState("");
    const [progress, setProgress] = useState(0);
    const [error, setError] = useState(null);


    const handleChange = (e) => {

        const file = e.target.files[0];
        // console.log(file);
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

    const updateUser = async (user_id, image_url) => {
        const response = await axios.put('/users/upload', {
            id: id,
            image_url: imageUrl,
        });
        // const JsonResponse = await response.json();
        // console.log(response, typeof response);
    }

    const handleUpload = (e) => {
        e.preventDefault();
        if (image) {
            const uploadTask = storage.ref(`images/${image.name}`).put(image)

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
                        // console.log(url)
                        setImageUrl(url);
                        setProgress(0);
                    })
                    .then(
                        updateUser(id, imageUrl)
                    );
            });
        } else {
            setError("Error please choose an image to upload");
        }
    }

    return (
        <Fragment>
            {error && (
                <div class="alert alert-danger" role="alert">
                    {error}
                </div>
            )}
            <form className="col-6">
                <div className="form-group">
                    <label htmlFor="exampleFormControlFile1">Example file input</label>
                    <input type="file" className="form-control-file mb-2" id="exampleFormControlFile1" onChange={handleChange} />
                    <button onClick={handleUpload} className="btn btn-sm btn-primary">Upload</button>
                </div>
                {progress > 0 ? <progress id="file" max="100" value={progress}> {progress}% </progress> : null}
            </form>
        </Fragment>
    );
}

export default Avatar;