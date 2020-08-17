const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const mongoose = require('mongoose');

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const messagesRouter = require('./routes/messages');
const avatarRouter = require('./routes/avatar');

const app = express();

// view engine setup
// app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "client", "build")));

mongoose.connect(`mongodb+srv://${process.env.DB_ADMIN}:${process.env.DB_PASSWORD}@microbloggos.p22fo.mongodb.net/microbloggos?retryWrites=true&w=majority` || `mongodb://localhost:27042/test`, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false })
  .then(() => {
    console.log("Connection successful")
  }).catch(e => {
    console.log(e)
  });
// mongoose.connect(process.env.MONGODB_URI || `mongodb://localhost:27042/test`, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false })
//   .then(() => {
//     console.log("Connected..")
//   }).catch(err => {
//     console.log('Caught: ', err.stack)
//   });

// cors handler
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/messages', messagesRouter);
app.use('/avatar', avatarRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  console.log(err);
  res.json({ "error": err.message });
});

// Redirect all the routes to client/build/index.html
if (process.env.NODE_ENV === "production") {

  app.use(express.static(path.join(__dirname, "client", "build")));
  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "client/build/index.html"));
  });

  app.listen(process.env.PORT, () => {
    console.log("Runnig in production server");
    console.log(process.env.NODE_ENV);
  })

}


module.exports = app;
