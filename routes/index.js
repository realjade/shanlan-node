var express = require('express')
var router = express.Router()

//self
var utils = require('../lib/utils')

//登录
router.route('/login').get(function (req, res) {
    res.render('account/login', {
        title: '登录'
    })
}).post(function (req, res) {
        utils.getApiData('User.login', req, function (data) {
            if (data.code == '200') {
                //注册成功
                res.render('account/message', {
                    message: '恭喜您登录成功'
                })
            } else {
                res.render('account/login', {
                    title: '登录',
                    error: data.message
                })
            }
        })
    })

//注册
router.route('/register').get(function (req, res) {
    res.render('account/register', {
        title: '注册'
    })
}).post(function (req, res) {
        utils.getApiData('User.register', req, function (data) {
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
        })
    });

//登出
router.get('/logout', function (req, res) {
    res.render('index')
});

router.get('/mock', function (req, res) {
    res.render('account/message', {
        message: '恭喜您注册成功，<a href="/login">登录</a>后，更加精彩'
    })
})

/* GET home page. */
router.route('/j/*').all(function (req, res) {
    utils.sendRequest(req, function (data) {
        console.log('end：' + data)
        res.json(200, JSON.parse(data));
    });
});

router.get('/la', function (req, res) {
    res.json(200, {test: 'test'});
});

//注册
router.get('/test', function (req, res) {
    res.render('test', {
        title: '注册'
    });
});
module.exports = router;
