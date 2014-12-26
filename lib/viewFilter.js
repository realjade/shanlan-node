/**
 * @name zhangyy-g@grandsoft.com.cn
 * @description zhangyy's code
 * Date: 14-7-29
 * Time: 下午4:59
 *
 */
var utils = require('./utils')
module.exports = {
    isNull: function(value, def){
        if(!value){
            if(typeof def !== 'undefined'){
                return def
            }
            return ''
        }
        return value
    }
}