/**
 * @name Edwin
 * @description
 * Date: 2014/10/19
 * Time: 2:04
 *
 */
var express = require('express');
var async = require('async')
var utils = require('../lib/utils')

var router = express.Router();

/* user setting. */
router.get('/setting', function (req, res) {
    var me = res.locals._user
    var ownerUserName = (me && me.userName) || null

    res.render('personal/setting', {
        subTab: 'setting'
    });
});
module.exports = router;
