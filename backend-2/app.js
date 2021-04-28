// import the required modules.
var express = require('express');
var path = require('path');
const bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const jwt = require('jsonwebtoken');
const privateKey = 'null';
const cors = require('cors');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var categoryRouter = require('./routes/category');
var dishRouter = require('./routes/dish');
var addStockRouter = require('./routes/add-stock');
var reduceStockRouter = require('./routes/reduceStock');
var invoicekRouter = require('./routes/invoice');

// Initialize the express object.
var app = express();

// enabling cors for all requests by using cors middleware.
app.use(
 cors({
  credentials: true,
  origin: (req, cb) => {
   // allow from anywhere
   cb(null, true);
  },
 }),
);
// solve: has block by cors.
// no need, already use cors()
// app.use(function (req, res, next) {
//   res.header('Access-Control-Allow-Origin', '*');
//   res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
//   res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
//   next();
// });
app.use(logger('dev'));
// body-parser: parse requests of content-type: application/json (to parse incoming data).
app.use(bodyParser.json());
// body-parser: parse requests of content-type: application/x-www-form-urlencoded.
app.use(bodyParser.urlencoded({ extended: false }));
// parse requests of content-type: application/json.
// parses incoming requests with JSON payloads.
app.use(express.json());
// parse application/x-www-form-urlencoded.
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use('/public', express.static('public'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'public/images/users')));
app.use('/public/images/dish', express.static(path.join(__dirname, 'public/images/dish')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/category', categoryRouter);
app.use('/dish', dishRouter);
app.use('/addStock', addStockRouter);
app.use('/reduceStock', reduceStockRouter);
app.use('/invoice', invoicekRouter);

function validateUser(req, res, next) {
 // headers with name x-access-token.
 jwt.verify(req.headers['x-access-token'], privateKey, (err, decoded) => {
  if (err) {
   // if not login, will show message please log in again.
   res.status(401).json({ ...err, message: 'please log in again' });
  } else {
   // success login, will show the result.
   req.body.userId = decoded.id;
   next();
  }
 });
}

module.exports = app;