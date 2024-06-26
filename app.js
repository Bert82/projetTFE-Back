var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const cors = require('cors');
const bcrypt = require('bcryptjs');

const bodyPerser = require ('body-parser')

var indexRouter = require('./routes/index');
const agentsRouter = require('./routes/agent');
const applicantRouter = require('./routes/applicant');
const mobiliteRouter = require('./routes/mobilite');
const csrRouter = require('./routes/csr');
const agentReportRouter = require('./routes/agentReport');
//const authRouter = require('./routes/auth');
const usersRouter = require('./routes/users');
const listeAgentRouter = require('./routes/listeAgent');



var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');
app.use(cors({
  origin: 'http://localhost:4200'
}));
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyPerser.json());

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/agents', agentsRouter);
app.use('/applicant', applicantRouter);
app.use('/mobilite', mobiliteRouter);
app.use('/csr', csrRouter);
app.use('/agentReport', agentReportRouter);
app.use('/listeAgent', listeAgentRouter);
//app.use('/auth', authRouter);
//app.use(cors());

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
  res.status(err.status || 500);
  res.render('error');
});


module.exports = app;
