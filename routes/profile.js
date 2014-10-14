var express = require('express');
var async = require('async')
var utils = require('../lib/utils')

var router = express.Router();

/* user profile. */
router.get(['/', '/:userName'], function (req, res) {
    var ownerUserName = req.params.userName || 'wangwu3'

    async.parallel({
        owner: function (callback) {
            utils.ajax({
                url: 'User.getBaseInfoByUserName',
                method: 'post',
                data: {
                    userName: ownerUserName
                },
                req: req,
                callback: function (err, data) {
                    callback(null, data.data);
                }
            })
        },
        group: function (callback) {
            utils.ajax({
                url: 'Photo.getPhotoCollections',
                method: 'post',
                data: {
                    userName: ownerUserName
                },
                req: req,
                callback: function (err, data) {
                    callback(null, data.data);
                }
            })
        }
    }, function (err, results) {
        console.log(results)
        res.render('profile/index', {
            owner: {
                userName: 'Jade',
                id: '1'
            },
            subTab: 'index'
        });
    });


});

/* user about. */
router.get(['/about', '/about/:id'], function (req, res) {
//    utils.getApiData('profile.about', req, function (data) {
//        if (data.code == '200') {
//
//            var ownerId = req.params.id || '2'
//            var itemList = data.
//
//            res.render('profile/about', {
//                owner:{
//                    userName: 'Jade',
//                    id: ownerId
//                },
//                subTab: 'about'
//            });
//        } else {
//            res.render('profile/about', {
//                title: '遇到点问题',
//                error: data.message
//            })
//        }
//    })

    var ownerId = req.params.id || '2'

    res.render('profile/about', {
        owner: {
            userName: 'Jade',
            id: ownerId
        },
        subTab: 'about',
        itemList: [
            {head: '用手和心 拍摄和制作', content: '<img src="//static.jspass.com/static/css/profile/images/intro2.png"> <p>用手和心<br> 拍摄和制作</p>'},
            {head: '更美更真实的后期', content: '<img src="//static.jspass.com/static/css/profile/images/intro3.png">'}
        ]
    });

});


/* user trade. */
router.get(['/trade', '/trade/:id'], function (req, res) {

    var ownerId = req.params.id || '2'

    res.render('profile/trade', {
        owner: {
            userName: 'Jade',
            id: ownerId
        },
        subTab: 'trade',
        itemList: [
            {
                portraitURL: "//static.jspass.com/static/css/profile/images/trade-portrait1.png",
                name: "晴天",
                star: 5,
                info: "( 1000元 · 胶片写真A · 2014-09-30 )",
                comment: "每次情感泛滥的时候都会语无伦次，这次也是，不知道从何说起了。其实这次去厦门就是因为自己在淘宝上逛，遇到了树摄影，爱的一发不可收拾，这才拉上闺蜜来了一次说走就走的旅行。树的技术不用多评论，大家可以看到这么多客照，自己就是被这么多有感觉的客照吸引的。但是树这个人，真的会带给你更多，我见过最暖的暖男，一路上边聊边拍、让人很快就能完全信任他，在你不经意间拍的都是你最美的样子，兔子夜好幸福哦，有个好好先生。羡慕这对小夫妻~希望更多的人知道你们！",
                photosURL: [
                    "//static.jspass.com/static/css/profile/images/trade-1-0.png",
                    "//static.jspass.com/static/css/profile/images/trade-1-1.png",
                    "//static.jspass.com/static/css/profile/images/trade-1-2.png",
                    "//static.jspass.com/static/css/profile/images/trade-1-3.png",
                    "//static.jspass.com/static/css/profile/images/trade-1-4.png",
                    "//static.jspass.com/static/css/profile/images/trade-1-5.png",
                    "//static.jspass.com/static/css/profile/images/trade-1-6.png"

                ],
                photoNum: 38
            },
            {
                portraitURL: "//static.jspass.com/static/css/profile/images/trade-portrait2.png",
                name: "雨溪",
                star: 5,
                info: "( 1800元 · 胶片写真A · 2014-08-30 )",
                comment: "找到自己喜欢的风格，然后再找对摄影师，一切就省心省力，拍的满意自然也就是顺理成章的事情，选择叶树就是这样，拍出来跟想象中一样满意！不过下次再拍我一定会选个稍微冷一点的天气，33度的气温对于我这种容易中暑容易出汗的人，实在是个煎熬！谢谢叶树，还要一路帮我拖了行李箱，辛苦了！",
                photosURL: [
                    "//static.jspass.com/static/css/profile/images/trade-2-0.png",
                    "//static.jspass.com/static/css/profile/images/trade-2-1.png",
                    "//static.jspass.com/static/css/profile/images/trade-2-2.png",
                    "//static.jspass.com/static/css/profile/images/trade-2-3.png",
                    "//static.jspass.com/static/css/profile/images/trade-2-4.png",
                    "//static.jspass.com/static/css/profile/images/trade-2-5.png",
                    "//static.jspass.com/static/css/profile/images/trade-2-6.png"

                ],
                photoNum: 74
            }
        ]
    });

});

/* user package. */
router.get(['/package', '/package/:id'], function (req, res) {
    var ownerId = req.params.id || '2'

    res.render('profile/package', {
        owner: {
            userName: 'Jade',
            id: ownerId
        },
        subTab: 'package'
    });

});
module.exports = router;
