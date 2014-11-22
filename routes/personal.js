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

    res.render('personal/setting', {
        subTab: 'setting'
    })
})

/* user account. */
router.get('/account', filter.login, function (req, res) {
    var me = res.locals._user

    res.render('personal/account', {
        subTab: 'account'
    })
})


/* user order list. */
router.get(['/order','/order?index=:index'], filter.login, function (req, res) {
    var me = res.locals._user
    var ownerUserName = (me && me.userName) || null
    var index = req.params.index || '0'

    utils.ajax({
        url: 'Trade.pageTradeOrders',
        method: 'get',
        data: {
            pageIndex: index,
            pageSize:'10'
        },
        req: req,
        callback: function (err, data) {
            if(data.code == 200){
                data.data.subTab = 'order'
                res.render('personal/order',data.data)
            }
            else{
                res.render('personal/order', {subTab: 'order'})
            }
        }
    })
})

/* user order detail. */
router.get('/orderdetail/:orderNum', filter.login, function (req, res) {
    var me = res.locals._user
    var ownerUserName = (me && me.userName) || null
    var orderNum = req.params.orderNum

    utils.ajax({
        url: 'Trade.getTradeOrderDetailInfo',
        method: 'get',
        data: {
            tradeOrderNumber: orderNum
        },
        req: req,
        callback: function (err, data) {
            if(data.code == 200){
                data.data.subTab = 'order'
                res.render('personal/orderdetail',data.data)
            }
            else{
                res.render('personal/order', {subTab: 'order'})
            }
        }
    })
})

/* photographer package */
router.get('/package', filter.login, function (req, res) {
    var me = res.locals._user
    var ownerUserName = (me && me.userName) || null

    res.render('personal/package', {
        subTab: 'package'
    })
})

/* photographer create/modify package */
router.get('/packagesetting', filter.login, function (req, res) {
    var me = res.locals._user
    var ownerUserName = (me && me.userName) || null

    res.render('personal/packagesetting', {
        subTab: 'package'
    })
})

module.exports = router



/* photographer photo/album manage */
router.get('/photo', filter.login, function (req, res) {
    var me = res.locals._user
    var ownerUserName = (me && me.userName) || null

    res.render('personal/photo', {
        subTab: 'photo'
    })
})

module.exports = router