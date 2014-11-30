var express = require('express')
var router = express.Router()

//self
var utils = require('../lib/utils')
var filter = require('../lib/filter')

//登录
router.route('/login').get(function (req, res) {
    var me = res.locals._user

    if (me) {
        res.redirect('/')
        return false
    }

    res.render('account/login', {
        title: '登录',
        next: req.get('Referrer') || ''
    })
}).post(function (req, res) {
    var me = res.locals._user

    if (me) {
        res.redirect('/')
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
                var next = req.param('next')
                if(!next || next == 'undefined'){
                    next = '/'
                }
                res.redirect(next)

            } else {
                res.render('account/login', {
                    title: '登录',
                    error: data.message
                })
            }
        }
    })
})

//注册
router.route('/register').get(function (req, res) {
    res.render('account/register', {
        title: '注册'
    })
}).post(function (req, res) {
    utils.ajax({
        url: 'User.register',
        req: req,
        callback: function (err, data) {
            if (data.code == '200') {
                //注册成功
                res.render('account/message', {
                    message: '恭喜您注册成功，<a href="/login">登录</a>后，更加精彩'
                })
            } else {
                res.render('account/register', {
                    title: '注册',
                    error: data.message
                })
            }
        }
    })
});

//登出
router.get('/logout', function (req, res) {
    var session = req.session
    if (session) {
        session.user = null
    }
    utils.goIndex(res)
})

router.get('/mock', function (req, res) {
    res.render('account/message', {
        message: '恭喜您注册成功，<a href="/login">登录</a>后，更加精彩'
    })
})

/* GET home page. */
router.route(['/s', '/s/*']).all(function (req, res) {
    var service = req.param('service')

    utils.ajax({
        url: service,
        req: req,
        callback: function (err, data) {
            filter.optEnd(service, data, req)
            res.json(data);
        }
    })
});

//error page
router.get('/error', function (req, res) {
    res.render('error')
})

module.exports = router;
