var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const cors = require("cors");
const bodyParser = require("body-parser");

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var dishRouter = require('./routes/dish');
var stockRouter = require('./routes/stock');
var checkoutRouter = require('./routes/checkout');

var app = express();

app.use(cors());
// has block by cors.
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.use(logger('dev'));
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/dish', dishRouter);
app.use('/stock', stockRouter);
app.use('/checkout', checkoutRouter);

module.exports = app;