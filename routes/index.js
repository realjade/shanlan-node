var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/',function(req, res) {
    res.render('index');
});

//登录
router.get('/login',function(req, res) {
    res.render('index');
});

//登出
router.get('/login',function(req, res) {
    res.render('index');
});

module.exports = router;
