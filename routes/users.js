require('dotenv').config();
const express = require('express');
const router = express.Router();
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const Member = require("../model/memberSchema");
const jwt = require("jsonwebtoken");
const secretKey = process.env.SECRET_KEY;
const verifyToken = require('../middlewares/tokenMiddleware');

/* GET users listing. */
router.get('/', function (req, res, next) {
  Member.find({}, (err, user) => {
    res.send(user);
  });
});

router.get('/profile/:id', (req, res) => {
  id = req.params.id;
  Member.findById(id, (err, user) => {
    if (err) throw err;
    res.send(user);
  });
});

router.post('/register', function (req, res, next) {

  console.log(req.body);
  let username = req.body.username;
  let password = req.body.password;
  let password_confirm = req.body.password_confirm;
  let email = req.body.email;

  if (password === password_confirm) {
    const saltRounds = 10;
    let hash = bcrypt.hashSync(password, saltRounds);
    let user = new Member({
      username: username,
      password: hash,
      email: email
    });
    user.save((err, data) => {
      if (err) throw err;
      console.log('User registered successfully')
      res.send(data)
    })
  }

});

router.post("/login", (req, res) => {

  let login = req.body.username;
  let password = req.body.password;

  Member.find({
    username: login
  }, (err, user) => {
    if (err) throw err;

    let loggedUser = bcrypt.compareSync(password, user[0].password)
    if (loggedUser) {
      // res.send(user)
      const username = user[0].username;
      const email = user[0].email;
      const id = user[0]._id;
      jwt.sign({ id, username, email }, secretKey, (err, token) => {
        if (err) throw err;

        res.send({
          user: { id, username, email },
          token
        });
      });
    }
  })
});

router.put('/update/:id', (req, res) => {

  console.log(req.body);
  const username = req.body.username;
  const password = req.body.password;
  const password_confirm = req.body.password_confirm;
  const email = req.body.email;

  if (req.body.password === req.body.password_confirm) {
    const saltRounds = 10;
    const hash = bcrypt.hashSync(password, saltRounds);

    Member.findByIdAndUpdate(req.params.id, { username, email, password: hash }, { new: true }, (err, user) => {
      if (err) throw err;
      res.send(user);
    })
  }

});

router.put('/upload', (req, res) => {
  console.log("image to upload req: ", req.body);
  const avatar_url = req.body.image_url;
  const id = req.body.id;
  console.log(id);
  console.log(avatar_url);
  Member.findByIdAndUpdate(id, { avatar_url }, { new: true }, (err, user) => {
    if (err) throw err;
    res.json(user);
  })
});


router.get('/subscribes/:id', (req, res) => {
  Member.findById(req.params.id, (err, user) => {
    if (err) throw err;
    res.json(({ subscribes: user.follow }));
  })
})

router.put('/subscribe', (req, res) => {
  console.log(req.body);
  Member.findByIdAndUpdate(req.body.id, { follow: req.body.subscribes }, { new: true }, (err, user) => {
    if (err) throw err;
    res.json(user)
      ;
  })
})

module.exports = router;
