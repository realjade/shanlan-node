var fs = require('fs');

var urlPrefix = '//static.shanlan.com/'
var staticPath = 'static'

//处理JS文件合并压缩
var jsPath = staticPath + '/js/merge'
walk(jsPath, 0 , function(path, floor){
    if(floor > 0){
        fs.readFile(path, 'utf8', function (err, data) {
            if (err) throw err;
            fs.writeFile(path, '', function (err) {
                if (err) throw err;
            });
            var jsFiles = data.match(/static\/js\/.+\.js/g)
            if(!jsFiles) return false;
            for (var i = 0, len = jsFiles.length; i < len; i++) {
                console.log(jsFiles[i])
                fs.readFile(jsFiles[i], 'utf8', function(err, data){
                    fs.appendFile(path, data + ';', function (err) {
                        if (err) throw err;
                    });
                })
            }
        });
    }
})

//处理css文件合并压缩
var CleanCSS = require('clean-css');
var cssPath = staticPath + '/css/merge'
walk(cssPath, 0 , function(path, floor){
    if(floor > 0){
        fs.readFile(path, 'utf8', function (err, data) {
            if (err) throw err;
            fs.writeFile(path, '', function (err) {
                if (err) throw err;
            });
            var cssFiles = data.match(/\'(.+\.css)\'/g)
            if(!cssFiles) return false;
            for (var i = 0, len = cssFiles.length; i < len; i++) {
                var cssItem = cssFiles[i]
                cssItem = cssItem.substring(1, cssItem.length - 1)
                console.log(cssItem)
                fs.readFile(cssPath + '/' + cssItem, 'utf8', function(err, data){
                    data = data.replace(/url\((.+)\)/g, 'url(' + cssItem.substring(0,cssItem.lastIndexOf('/')) + '/$1)')
                    data = new CleanCSS().minify(data)
                    fs.appendFile(path, data, function (err) {
                        if (err) throw err;
                    });
                })
            }
        });
    }
})


function walk(path, floor, handleFile) {
    handleFile(path, floor);
    floor++;
    fs.readdir(path, function(err, files) {
        if (err) {
            console.log('read dir error');
        } else {
            files.forEach(function(item) {
                var tmpPath = path + '/' + item;
                fs.stat(tmpPath, function(err1, stats) {
                    if (err1) {
                        console.log('stat error');
                    } else {
                        if (stats.isDirectory()) {
                            walk(tmpPath, floor, handleFile);
                        } else {
                            handleFile(tmpPath, floor);
                        }
                    }
                })
            });

        }
    });
}