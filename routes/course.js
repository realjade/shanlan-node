/**
 * @name zhangyy-g@grandsoft.com.cn
 * @description zhangyy's code
 * Date: 14-7-30
 * Time: 下午4:20
 * course相关页面
 */
var express = require('express');
var router = express.Router();

/* GET course page. */
router.get('/list', function (req, res) {
    res.render('course/list', {tab: 'course'});
});

module.exports = router;