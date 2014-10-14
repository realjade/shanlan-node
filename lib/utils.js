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

    ajax: function (options) {
        var param = utils.parseRequest(options.req)
        if (options.method) {
            param.method = options.method
        }
        param.param = options.data

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
                'param': req.param,
                'secret': 'secret1',
                'sign': '06F6DF0CE299C32C534FBBA308E5365BA4B95F0A'
            }
        )

        options.path = encodeURI(options.path)

        self.sendRequest(options, callback)
    },
    sendRequest: function (options, callback) {
        var httpClient = http.request(options, function (response) {
            response.setEncoding('utf8');
            response.on('data', function (chunk) {
                console.log(chunk)
                callback && callback(JSON.parse(chunk));
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