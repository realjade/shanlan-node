var express = require('express');
var async = require('async');
var utils = require('../lib/utils');
var router = express.Router();

/* main page. */
router.get('/', function (req, res) {
    var me = res.locals._user

    var ownerUserName = req.params.userName || (me && me.userName) || null

    async.parallel({
        photographers: function (callback) {
            utils.ajax({
                url: 'User.pagePhotographers',
                method: 'get',
                data: {
                    pageSize:'10',
                    pageIndex:'0'
                },
                req: req,
                callback: function (err, data) {
                    callback(null, data.data);
                }
            })
        },
        collections: function (callback) {
            utils.ajax({
                url: 'Photo.pageWorkCollections',
                method: 'get',
                data: {
                    pageSize:'9',
                    pageIndex:'0'
                },
                req: req,
                callback: function (err, data) {
                    callback(null, data.data);
                }
            })
        }
    }, function (err, results) {
        results.me = me
        results.owner = utils.wrapUser(utils.extend({},results.owner))
        res.render('main/home', results);
    });
});

/* blog page. */
router.get(['/blog','/blog/:id'], function (req, res) {
    res.render('main/blog');
});
module.exports = router;
