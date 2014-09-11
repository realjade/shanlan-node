/**
 * @name zhangyy-g@grandsoft.com.cn
 * @description zhangyy's code
 * Date: 14-7-29
 * Time: 下午4:59
 *
 */
module.exports = {
    staticFilter: function(url){
        return {
            '//static.jspass.com/static/images/favicon.ico': '//static.jspass.com/static/images/favicon.ico?md5=1',
            'test':'staticFilter1',
            '//static.shanlan.com/static/js/merge/test.merge.js': '//static.shanlan.com/static/js/merge/test.merge.js?md5=2'
        }[url]
    }
}