/**
 * @name zhangyy-g@grandsoft.com.cn
 * @description zhangyy's code
 * Date: 2014/9/13
 * Time: 20:57
 *
 */

var fs = require('fs');
var crypto = require('crypto');

var staticPath = 'static';
var jsPath = staticPath + '/js/merge';
var staticFilterPath = 'lib/staticFilter.js';

var md5Str = '';

walk(jsPath, 0 , function(path, floor) {
    if(floor > 0){
        var md5 = getMd5(path);
        if(md5Str){
            md5Str += ',\n            \'//static.iyixiang.cn/' + path + '\'' + ': \'//static.iyixiang.cn' + path + '?' + md5.substring(0,6) + '\'';
        }else{
            md5Str += '            \'//static.iyixiang.cn/' + path + '\'' + ': \'//static.iyixiang.cn' + path + '?' + md5.substring(0,6) + '\'';
        }
    }
});
console.log(md5Str);
var content = '' +
    'module.exports = {\n' +
    '    staticFilter: function(url){\n' +
    '        return {\n' + md5Str + '\n        }[url]\n    }\n}';
content.replace('0', md5Str);

console.log(content)
fs.writeFile(staticFilterPath, content, function (err) {
    if (err) throw err;
});

function getMd5(path){
    var str = fs.readFileSync(path,'utf-8');
    var md5um = crypto.createHash('md5');
    md5um.update(str);
    return md5um.digest('hex');
}

function walk(path, floor, handleFile) {
    handleFile(path, floor);
    floor++;
    var files = fs.readdirSync(path);
    files.forEach(function(item) {
        var tmpPath = path + '/' + item;
        handleFile(tmpPath, floor);
    });
}