const createError = require('http-errors');
const express = require('express');
const axios = require('axios');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const indexRouter = require('./routes/index');
const twitterRouter = require('./routes/twitter');
const twitterConnectRouter = require('./routes/twitterConnect');
const fs = require("fs");

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/twitter', twitterRouter);
app.use('/twitter/connect', twitterConnectRouter);

app.route('/sessions')
    .post((req, res1) => {
        fs.readFile('cookies.txt', (err, data) => {
            if (err) console.log(err);
            else {
                axios.post('https://www.twitter.com/sessions', {
                    data: req.body,
                    withCredentials: true,
                    headers: {
                        Cookie: data
                    }
                })
                    .then((res) => {
                        console.log(res.headers);
                        res1.send(res)
                    })
                    .catch((err) => {
                        res1.send(err)
                    });
            }
        });
    });

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
    res.render('error');
});

module.exports = app;