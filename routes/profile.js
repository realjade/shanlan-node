var express = require('express');
var async = require('async')
var utils = require('../lib/utils')

var router = express.Router();

/* user profile. */
router.get(['/', '/:userName'], function (req, res) {
    var me = res.locals._user

    var ownerUserName = req.params.userName || (me && me.userName) || null

    if(!ownerUserName){
        utils.goIndex(res)
    }

    async.parallel({
        owner: function (callback) {
            utils.ajax({
                url: 'User.getBaseInfoByUserName',
                method: 'get',
                data: {
                    userName: ownerUserName
                },
                req: req,
                callback: function (err, data) {
                    callback(null, data.data);
                }
            })
        },
        collects: function (callback) {
            utils.ajax({
                url: 'Photo.getPhotoCollections',
                method: 'get',
                data: {
                    userName: ownerUserName
                },
                req: req,
                callback: function (err, data) {
                    callback(null, data.data);
                }
            })
        }
    }, function (err, results) {
        if(!results.owner){
            utils.goError(res, '对不起，找不到该用户')
        }else{
            results.me = me
            results.subTab = 'index'
            res.render('profile/index', results);
        }
    });
});

/* user about. */
router.get(['/about', '/about/:userName'], function (req, res) {
    var me = res.locals._user

    var ownerUserName = req.params.userName || (me && me.userName) || null

    if(!ownerUserName){
        res.redirect('/')
    }

    async.parallel({
        owner: function (callback) {
            utils.ajax({
                url: 'User.getBaseInfoByUserName',
                method: 'get',
                data: {
                    userName: ownerUserName
                },
                req: req,
                callback: function (err, data) {
                    callback(null, data.data);
                }
            })
        },
        introductions: function (callback) {
            utils.ajax({
                url: 'User.getIntroductions',
                method: 'get',
                data: {
                    userName: ownerUserName
                },
                req: req,
                callback: function (err, data) {
                    callback(null, data.data);
                }
            })
        }
    }, function (err, results) {
        results.me = me
        results.subTab = 'about'
        res.render('profile/about', results);
    });
});


/* user trade. */
router.get(['/trade', '/trade/:userName'], function (req, res) {
    var me = res.locals._user

    var ownerUserName = req.params.userName || (me && me.userName) || null

    if(!ownerUserName){
        res.redirect('/')
    }

    async.parallel({
        owner: function (callback) {
            utils.ajax({
                url: 'User.getBaseInfoByUserName',
                method: 'get',
                data: {
                    userName: ownerUserName
                },
                req: req,
                callback: function (err, data) {
                    callback(null, data.data);
                }
            })
        },
        comments: function (callback) {
            utils.ajax({
                url: 'Trade.pageTradeComments',
                method: 'get',
                data: {
                    userName: ownerUserName,
                    currentPage:0,
                    pageSize:10
                },
                req: req,
                callback: function (err, data) {
                    callback(null, data.data);
                }
            })
        }
    }, function (err, results) {
        results.me = me
        results.subTab = 'trade'
        res.render('profile/trade', results);
    });
});

/* user package. */
router.get(['/package', '/package/:userName'], function (req, res) {
    var me = res.locals._user

    var ownerUserName = req.params.userName || (me && me.userName) || null

    if(!ownerUserName){
        res.redirect('/')
    }

    async.parallel({
        owner: function (callback) {
            utils.ajax({
                url: 'User.getBaseInfoByUserName',
                method: 'get',
                data: {
                    userName: ownerUserName
                },
                req: req,
                callback: function (err, data) {
                    callback(null, data.data);
                }
            })
        },
        packages: function (callback) {
            utils.ajax({
                url: 'Trade.listPackages',
                method: 'get',
                data: {
                    userName: ownerUserName,
                    type:'all'
                },
                req: req,
                callback: function (err, data) {
                    callback(null, data.data);
                }
            })
        }
    }, function (err, results) {
        results.me = me
        results.subTab = 'package'
        res.render('profile/package', results);
    });
});
module.exports = router;
