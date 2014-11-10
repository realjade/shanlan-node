var express = require('express');
var router = express.Router();

var utils = require('../lib/utils')

/* search result page. */
router.get('/', function (req, res) {
    var address = req.param('address') || ''
    address = address.split('-')
    var url = 'Trade.pagePackagesSearch'
    var searchType = req.param('searchType')
    if(searchType == 'photographer'){
        url = 'User.pagePhotographersSearch'
    }
    utils.ajax({
        url: url,
        method: 'get',
        data: {
            province: address[0],
            city: address.length > 1 ? address[1] : '',
            country: '中国'
        },
        req: req,
        callback: function (err, data) {
            if(data.code == 200){
                res.render('search/photo', data.data)
            }else{
                res.render('search/photo', {
                    error: '没有找到搜索到数据'
                })
            }
        }
    })
});
module.exports = router;
