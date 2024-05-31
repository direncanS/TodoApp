var createError = require('http-errors');
var express = require('express');
var cors = require('cors');
var path = require('path');
var cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
var logger = require('morgan');
require('dotenv').config({ path: 'env.local' });

var todosRouter = require('./routes/todos');
var usersRouter = require('./routes/users');
const db = require('./db/db');

var app = express();
// app.use(cors());
app.use(cors({
  origin: "http://127.0.0.1:5173",
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  allowedHeaders: ['Content-Type', 'Authorization'] // Ensure Authorization is allowed
}));
app.use(bodyParser.json());  

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/todos', todosRouter);
app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  next(createError(err.status || 500));
});

// Start the server on port 8080
app.listen(8080, () => {
  console.log('Server running on port 8080');
  db.sync({
    logging: true,
  })
});

module.exports = app;
