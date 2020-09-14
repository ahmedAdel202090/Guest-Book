var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var authRouter = require('./routes/auth');
var apiRouter = require('./routes/api');
var mongoose=require('mongoose');

var app = express();
const cors = require('cors');

const url = process.env.MONGO_URL || 'mongodb://localhost:27017/guestBook-db';
console.log('waiting DB connecting...');
const connect= mongoose.connect(url,{autoIndex:true,retryWrites:false,useNewUrlParser:true,useUnifiedTopology:true,useCreateIndex:true });
connect.then((db)=>{
  console.log('Database Successfully connected');
  console.log(db.version);
},(err)=>console.log('error'));

// view engine setup
app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join("./client", 'build')));

app.get('/', function (req, res) {
  res.sendFile(path.join("./client", 'build', 'index.html'));
});
app.use('/auth', authRouter);
app.use('/api',apiRouter);
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500).send({err:err.message});
});

module.exports = app;
