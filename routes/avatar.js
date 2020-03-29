const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const fileUpload = require('express-fileupload');


router.post('/upload', (req, res) => {
    if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).send('No files were uploaded.');
    }

    console.log('line 16: ', req.body, req.files);
    res.json({ response: "file sent" });
    // The name of the input field (i.e. "sampleFile") is used to retrieve the uploaded file
    // let sampleFile = req.files.sampleFile;

    // // Use the mv() method to place the file somewhere on your server
    // sampleFile.mv('/somewhere/on/your/server/filename.jpg', function (err) {
    //     if (err)
    //         return res.status(500).send(err);

    //     res.send('File uploaded!');
    // });
});

module.exports = router;