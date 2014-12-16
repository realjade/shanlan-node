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

    utils.ajax({
        url: 'Photo.listPhotoCollections',
        method: 'get',
        data: {
            userName: ownerUserName
        },
        req: req,
        callback: function (err, data) {
            if(data.code == 200){
                data.subTab = 'photo'
                res.render('personal/photo',data)
            }
            else{
                res.render('personal/photo', {subTab: 'photo'})
            }
        }
    })
})


/* photographer photo/album manage */
router.get(['/photosetting/','/photosetting/:collectionId'], filter.login, function (req, res) {
    var me = res.locals._user
    var ownerUserName = (me && me.userName) || null
    var collectionId = req.params.collectionId || null

    if(collectionId){
        utils.ajax({
            url: 'Photo.getPhotoCollectionAndPhotos',
            method: 'get',
            data: {
                photoCollectionId: collectionId
            },
            req: req,
            callback: function (err, data) {
                if(data.code == 200){
                    data.subTab = 'photo'
                    res.render('personal/photosetting',data)
                }
                else{
                    res.render('personal/photosetting', {subTab: 'photo'})
                }
            }
        })
    }
    else{
        res.render('personal/photosetting', {subTab: 'photo'})
    }

})

module.exports = router