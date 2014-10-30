var express = require('express');
var path = require('path');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');
var RedisStore = require('connect-redis')(session);

//self
var staticFilter = require('./lib/staticFilter');
var filter = require('./lib/filter');
var utils = require('./lib/utils')
var config = require('./config');

var routes = require('./routes/index');
var main = require('./routes/main');
var profile = require('./routes/profile');
var users = require('./routes/users');
var personal = require('./routes/personal');
var mobile = require('./routes/mobile')

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser('keyboard cat'));

// 设置 Session
app.use(session({
    store: new RedisStore(config.redis),
    secret: 'keyboard cat',
    cookie:{
        originalMaxAge: 6000,
        maxAge: 1000 * 60 * 60 * 24
    }
}));

//把user从session中读取出来，然后设置到res的locals中去
app.use(function(req, res, next) {
    var session = req.session
    var user = session ? session.user : null
    if(user){
        res.locals._user =  utils.wrapUser(utils.extend({},user));
    }else{
        res.locals._user = null
    }
    res.locals.staticFilter = staticFilter.staticFilter
    res.locals.title = '高质量独立摄影平台'
    if(filter.isMobile(req) && req.path.indexOf('/m/') !== 0){
        res.redirect('/m/')
        return false
    }
    next();
});

app.use('/', routes);
app.use('/', main);
app.use('/profile', profile);
app.use('/users', users);
app.use('/personal',personal);
app.use('/m', mobile)

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});

module.exports = app;
