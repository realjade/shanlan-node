/**
 * @name zhangyy-g@grandsoft.com.cn
 * @description zhangyy's code
 * Date: 2014/9/11
 * Time: 22:12
 *
 */

var http = require('https');//https
var http = require('http');//http
var config = require('../config')

var utils = {

    goIndex: function (res) {
        res.redirect('/')
    },

    goError: function (res, message) {
        //console.log(message)
        res.render('error', {
            message: message
        })
    },

    updateUser: function (session, options) {
        var user = session.user
        this.extend(user, options)
        session.user = user
    },

    wrapUser: function (user) {
        var photoPath = user.photoPath
        if (photoPath) {
            user.avatar = {
                '30': photoPath.replace('X_X', '30_30'),
                '120': photoPath.replace('X_X', '120_120'),
                '200': photoPath.replace('X_X', '200_200')
            }
        } else {
            user.avatar = {
                '30': '//static.jspass.com/static/images/avatar/30.gif',
                '120': '//static.jspass.com/static/images/avatar/120.gif',
                '200': '//static.jspass.com/static/images/avatar/200.gif'
            }
        }
        return user
    },

    extend: function (obj, obj1) {
        for (var key in obj1) {
            obj[key] = obj1[key]
        }
        return obj
    },

    ajax: function (options) {
        var param = utils.parseRequest(options.req)
        if (options.method) {
            param.method = options.method
        }
        if (options.data) {
            param.param = options.data
        }

        utils.getApiData(options.url, param, function (data) {
            options.callback && options.callback(true, data)
        })
    },

    parseRequest: function (req) {
        var param = {}
        if (JSON.stringify(req.query) != '{}') {
            param = this.extend(param, req.query)
        }
        if (JSON.stringify(req.body) != '{}') {
            param = this.extend(param, req.body)
        }
        delete param.service
        return {
            param: param,
            method: req.method,
            Cookie: req.headers.Cookie,
            sessionId: req.sessionID
        }
    },


    getApiData: function (service, req, callback) {
        var self = this
        var options = {
            host: config.javaServer,
            port: config.javaPort,
            path: '/opf/services',
            //path: '/' + req.params[0],
            method: req.method,
            headers: {
                'accept': '*/*',
                //'content-type': "application/atom+xml",
                'accept-encoding': 'gzip, deflate',
                'accept-language': 'zh-CN,zh;q=0.8,en;q=0.6',
                'user-agent': 'nodejs rest client',
                Cookie: req.Cookie
            }
        }

        options.path += '?request=' + JSON.stringify(
            {
                'key': 'nodejs',
                'accessToken': '',
                'service': service,
                'formate': 'json',
                'v': 'V1.0',
                'sessionId': req.sessionId,
                'param': req.param,
                'secret': 'secret1',
                'sign': '06F6DF0CE299C32C534FBBA308E5365BA4B95F0A'
            }
        )

        console.log(options.path)

        options.path = encodeURI(options.path)

        self.sendRequest(options, callback)
    },
    sendRequest: function (options, callback) {
        var httpClient = http.request(options, function (response) {
            response.setEncoding('utf8');
            var chunks = [];
            response.on('data', function (chunk) {
                chunks.push(chunk);
            });
            response.on('end', function () {
                var data = null;
                // The UTF8 BOM [0xEF,0xBB,0xBF] is converted to [0xFE,0xFF] in the JS UTC16/UCS2 representation.
                // Strip this value out when the encoding is set to 'utf8', as upstream consumers won't expect it and it breaks JSON.parse().
                if (chunks[0].length > 0 && chunks[0][0] === '\uFEFF') {
                    chunks[0] = chunks[0].substring(1)
                }
                data = chunks.join('')
                console.log('result')
                console.log(data)
                var result = JSON.parse(data)
                if (result.data) {
                    result.data = JSON.parse(result.data)
                }
                callback && callback(result);
            });
        });

        httpClient.on('error', function (e) {
            console.log('problem with request: ' + e.message);
            callback && callback({
                code: '-1',
                message: '系统在梦游，请稍后再试'
            });
        });

        httpClient.end();
    },
    pathSpec: {
        ORIGINAL: '',
        COMPRESS: '_COMPRESS_',
        THUMBNAIL_600: '_THUMBNAIL_600_600'
    }

};

module.exports = utils;