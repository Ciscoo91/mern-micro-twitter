const express = require('express');
const router = express.Router();
const Member = require('../model/memberSchema');

router.get('/:id', (req, res) => {
    const id = req.params.id;
    console.log(req.params);
    Member.find({ _id: id }, (err, user) => {
        if (err) throw err;
        // console.log("line with user from db", user);
        res.json(user);
    })
});

module.exports = router;