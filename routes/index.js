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
        utils.getApiData('User.login', utils.parseRequest(req), function (data) {
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
        utils.getApiData('User.register', utils.parseRequest(req), function (data) {
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
router.route(['/opt', '/opf/*']).all(function (req, res) {
    var service = req.param('service')

    utils.ajax({
        url: service,
        req: req,
        callback: function (err, data) {
            res.json(data);
        }
    })
});

module.exports = router;
