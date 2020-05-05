const express = require('express');
const router = express.Router();
const mongoose = require("mongoose");
const Message = require('../model/messagesSchema');
const verifyToken = require('../middlewares/tokenMiddleware');

mongoose.connect("mongodb://localhost:27042/test", { useNewUrlParser: true, useUnifiedTopology: true });
// mongoose.connect("mongodb://Ciscoo91:maravilhaC2!@ds343718.mlab.com:43718/mern-twitter", { useNewUrlParser: true, useUnifiedTopology: true })
//     .then(
//     () => {
//         console.log("Connected..")
//     }
// ).catch(err => {
//     console.log('Caught: ', err.stack)
// });

router.post("/message", verifyToken, (req, res, next) => {
    let message = req.body.message;
    let author = req.body.author;
    let author_id = req.body.author_id;
    // console.log(req.body, req.body.message.length)

    let messageToSave = new Message({
        message: message,
        author: author,
        author_id: author_id
    });

    messageToSave.save((err, data) => {
        if (err) throw err;
        console.log('Message registered successfully')
        res.send(data)
    });

});

router.get("/messages", (req, res, next) => {
    Message.find({}).sort({ created_at: 'desc' }).exec((err, response) => {
        if (err) throw err;
        res.send(response);
    });
});

router.get('/messages/:id', (req, res) => {
    messageFrom = Message.find({ author_id: req.params.id }, (err, messages) => {
        if (err) throw err;
        // console.log(messages);
        res.json(messages);
    });
});

router.delete('/message/:id', (req, res) => {
    Message.deleteOne({ _id: req.params.id }, (err, message) => {
        if (err) throw err;
        res.send("Message deleted");
    })
});

router.put('/update/:id', (req, res) => {

    Message.findByIdAndUpdate(req.params.id, req.body, { new: true }, (err, message) => {
        if (err) throw err;
        res.send(message);
    })
});



module.exports = router;