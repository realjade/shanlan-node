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

    goIndex: function(res){
        res.redirect('/')
    },

    goError: function(res, message){
        //console.log(message)
        res.render('error', {
            message: message
        })
    },

    ajax: function (options) {
        var param = utils.parseRequest(options.req)
        if (options.method) {
            param.method = options.method
        }
        if(options.data){
            param.param = options.data
        }

        utils.getApiData(options.url, param, function (data) {
            options.callback && options.callback(true, data)
        })
    },

    parseRequest: function (req) {
        if (JSON.stringify(req.query) == '{}') {
            param = req.body
        } else {
            param = req.query
        }
        return {
            param: param,
            method: req.method,
            Cookie: req.headers.Cookie
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
                'sessionID': req.sessionID,
                'param': req.param,
                'secret': 'secret1',
                'sign': '06F6DF0CE299C32C534FBBA308E5365BA4B95F0A'
            }
        )

        //console.log(options)

        options.path = encodeURI(options.path)

        self.sendRequest(options, callback)
    },
    sendRequest: function (options, callback) {
        var httpClient = http.request(options, function (response) {
            response.setEncoding('utf8');
            var chunks = [];
            var size = 0;
            response.on('data', function (chunk) {
                chunks.push(chunk);
                size += chunk.length;
            });
            response.on('end', function () {
                var data = null;
                switch(chunks.length) {
                    case 0: data = new Buffer(0);
                        break;
                    case 1: data = chunks[0];
                        break;
                    default:
                        data = new Buffer(size);
                        for (var i = 0, pos = 0, l = chunks.length; i < l; i++) {
                            var chunk = chunks[i];
                            chunk.copy(data, pos);
                            pos += chunk.length;
                        }
                        break;
                }
                console.log('request result:')
                console.log(data)
                var result = JSON.parse(data)
                if(result.data){
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
    }
};

module.exports = utils;