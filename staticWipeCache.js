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
var staticFilterPath = 'lib/staticFilter.js';

var md5Str = '';

var jsPath = staticPath + '/js/merge';
walk(jsPath, 0 , jsWipeCache);

jsPath = staticPath + '/mobile/js/merge';
walk(jsPath, 0 , jsWipeCache);

function jsWipeCache(path, floor){
    if(floor > 0){
        var md5 = getMd5(path);
        if(md5Str){
            md5Str += ',\n            \'//static.jspass.com/' + path + '\'' + ': \'//static.jspass.com/' + path + '?' + md5.substring(0,6) + '\'';
        }else{
            md5Str += '            \'//static.jspass.com/' + path + '\'' + ': \'//static.jspass.com/' + path + '?' + md5.substring(0,6) + '\'';
        }
    }
}

var cssPath = staticPath + '/css/merge';
walk(cssPath, 0 , cssWipeCache);
cssPath = staticPath + '/mobile/css/merge';
walk(cssPath, 0 , cssWipeCache);

function cssWipeCache(path, floor) {
    if(floor > 0){
        var md5 = getMd5(path);
        if(md5Str){
            md5Str += ',\n            \'//static.jspass.com/' + path + '\'' + ': \'//static.jspass.com/' + path + '?' + md5.substring(0,6) + '\'';
        }else{
            md5Str += '            \'//static.jspass.com/' + path + '\'' + ': \'//static.jspass.com/' + path + '?' + md5.substring(0,6) + '\'';
        }
    }
}

var content = '' +
    'module.exports = {\n' +
    '    staticFilter: function(url){\n' +
    '        return {\n' + md5Str + '\n        }[url]\n    }\n}';

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