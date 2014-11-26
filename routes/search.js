var express = require('express');
var router = express.Router();

var utils = require('../lib/utils')

/* search result page. */
router.get('/', function (req, res) {
    var address = req.param('address') || ''
    address = address.split('-')
    var url = 'Trade.pageSearchPhotoPackages'
    var searchType = req.param('searchType')
    if (!searchType || searchType == 'photographer') {
        url = 'User.pageSearchPhotographers'
    }
    var pageSize = req.param('pageSize') || '1'
    var pageIndex = req.param('pageIndex') || '0'
    var orderType = req.param('orderType') || '2'
    utils.ajax({
        url: url,
        method: 'get',
        data: {
            province: address[0],
            city: address.length > 1 ? address[1] : '',
            country: '中国',
            pageSize: pageSize,
            pageIndex: pageIndex,
            orderType: orderType
        },
        req: req,
        callback: function (err, data) {
            if (data.code == 200) {
                res.render('search/photo', {
                        data: data.data,
                        searchType: req.param('searchType')
                    }
                )
            } else {
                res.render('search/photo', {
                    data: {
                        data:[]
                    },
                    searchType: req.param('searchType')
                })
            }
        }
    })
})
;
module.exports = router;
