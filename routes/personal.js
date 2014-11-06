/**
 * @name Edwin
 * @description
 * Date: 2014/10/19
 * Time: 2:04
 *
 */
var express = require('express')
var async = require('async')
var utils = require('../lib/utils')
var filter = require('../lib/filter')

var router = express.Router()

/* user setting. */
router.get('/setting', filter.login, function (req, res) {
    var me = res.locals._user
    var ownerUserName = (me && me.userName) || null

    res.render('personal/setting', {
        subTab: 'setting'
    })
})


/* user order. */
router.get('/order', filter.login, function (req, res) {
    var me = res.locals._user
    var ownerUserName = (me && me.userName) || null

    res.render('personal/order', {
        subTab: 'order'
    })
})

/* photographer package */
router.get('/package', filter.login, function (req, res) {
    var me = res.locals._user
    var ownerUserName = (me && me.userName) || null

    res.render('personalphotographer/package', {
        subTab: 'package'
    })
})

/* photographer create/modify package */
router.get('/packagesetting', filter.login, function (req, res) {
    var me = res.locals._user
    var ownerUserName = (me && me.userName) || null

    res.render('personalphotographer/packagesetting', {
        subTab: 'package'
    })
})

module.exports = router
