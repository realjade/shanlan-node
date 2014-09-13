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
    sendRequest: function (req, callback) {
        var options = {
            host: config.javaServer,
            port: config.javaPort,
            path: '/' + req.params[0],
            method: req.method,
            headers: {
                'accept': '*/*',
                //'content-type': "application/atom+xml",
                'accept-encoding': 'gzip, deflate',
                'accept-language': 'zh-CN,zh;q=0.8,en;q=0.6',
                'user-agent': 'nodejs rest client',
                Cookie: req.headers.Cookie
            }
        };
        console.log(options);
        var httpClient = http.request(options, function (response) {
            response.setEncoding('utf8');
            response.on('data', function (chunk) {
                callback && callback(chunk);
            });
        });

        httpClient.on('error', function (e) {
            console.log('problem with request: ' + e.message);
        });

        httpClient.end();
    }
};

module.exports = utils;