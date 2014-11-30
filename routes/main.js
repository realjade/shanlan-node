var express = require('express');
var async = require('async');
var utils = require('../lib/utils');
var router = express.Router();

/* main page. */
router.get('/', function (req, res) {

    utils.ajax({
        url: 'Photo.listPhotoCollections',
        method: 'get',
        data: {
            userName: 'yeshu'
        },
        req: req,
        callback: function (err, data) {
            res.render('main/home', data)
        }
    })
});

/* blog page. */
router.get(['/blog','/blog/:id'], function (req, res) {
    res.render('main/blog');
});
module.exports = router;
