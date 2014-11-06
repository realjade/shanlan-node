var express = require('express');
var router = express.Router();

//self
var utils = require('../lib/utils')
var filter = require('../lib/filter')

/* mobile. */
router.get('/', function (req, res) {
    var me = res.locals._user
    console.log(me)
    if(!me){
        res.redirect('/m/login')
        return false
    }
    res.render('mobile/home', {
        subTab: 'home'
    });
})

router.route('/login').get(function (req, res) {
    var me = res.locals._user

    if (me) {
        res.redirect('/m')
        return false
    }

    res.render('mobile/login', {
        title: '登录'
    })
}).post(function (req, res) {
    var me = res.locals._user

    console.log('login post')

    if (me) {
        res.redirect('/m')
        return false
    }
    utils.ajax({
        url: 'User.login',
        req: req,
        callback: function (err, data) {
            if (data.code == '200') {
                //session写入
                var session = req.session
                session.user = data.data

                res.redirect('/m')

            } else {
                res.render('account/login', {
                    title: '登录',
                    error: data.message
                })
            }
        }
    })
})

router.get('/logout', function (req, res) {
    var session = req.session
    if (session) {
        session.user = null
    }
    res.redirect('/m/login')
})
module.exports = router;
