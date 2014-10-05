var fs = require('fs');
var crypto = require('crypto');

path='static/js/merge/profile_package.merge.js';

try{
console.log(getMd5(path));
}catch(err){
console.log(err);
}








function getMd5(path){
    var str = fs.readFileSync(path,'utf-8');
    var md5um = crypto.createHash('md5');
    md5um.update(str);
    return md5um.digest('hex');
}