var express = require('express');
var router = express.Router();

//self
var utils = require('../lib/utils')

/* GET home page. */
router.get('/', function (req, res) {
    res.render('index');
});

//登录
router.get('/login', function (req, res) {
    console.log('%%%%login%%%')
    res.render('login');
});

//注册
router.get('/register', function (req, res) {
    res.render('account/register', {
        title: '注册'
    });
});

//登出
router.get('/logout', function (req, res) {
    res.render('index');
});

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
