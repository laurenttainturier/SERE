const axios = require('axios');
const express = require('express');
const request = require('request');
const fs = require("fs");
const router = express.Router();

/* GET users listing. */
router.get('/', function (req, res1, next) {
    fs.readFile('cookies.txt', (err, data) => {
        if (!err) {
            console.log("data:", data);
            request('https://www.twitter.com', {}, (err, res, body) => {
                if (err) return console.log(err);
                res1.send(body);
            });
        }
    });
});

module.exports = router;
