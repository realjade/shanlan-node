var express = require('express')
var router = express.Router()

//self
var utils = require('../lib/utils')

//登录
router.route('/login').get(function (req, res) {
    var me = res.locals._user

    if(me){
        res.redirect('profile')
    }

    res.render('account/login', {
        title: '登录',
        next: req.get('Referrer') || ''
    })
}).post(function (req, res) {
        var me = res.locals._user

        if(me){
            res.redirect('/profile')
        }
        utils.getApiData('User.login', utils.parseRequest(req), function (data) {
            if (data.code == '200') {
                //session写入
                var session = req.session
                session.user = data.data

                console.log(req.param('next'))

                if(req.param('next')){
                    res.redirect(req.param('next'))
                }else{
                    res.redirect('/profile')
                }

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
    var session = req.session
    session.user = null
    res.redirect('/')
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
