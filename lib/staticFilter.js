/**
 * @name zhangyy-g@grandsoft.com.cn
 * @description zhangyy's code
 * Date: 14-7-29
 * Time: 下午4:59
 *
 */
module.exports = {
    staticFilter: function(url){
        console.log('url:' + url)
        console.log({
            '//static.jspass.com/static/images/favicon.ico': '//static.jspass.com/static/images/favicon.ico?md5=1',
            'test':'staticFilter1'
        }[url])
        return {
            '//static.jspass.com/static/images/favicon.ico': '//static.jspass.com/static/images/favicon.ico?md5=1',
            'test':'staticFilter1'
        }[url]
    }
}