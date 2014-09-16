module.exports = {
    staticFilter: function(url){
        console.log('url:' + url)
        return {
            '//static.iyixiang.cn/static/js/merge/index.merge.js': '//static.iyixiang.cn/static/js/merge/index.merge.js?33a115',
            '//static.iyixiang.cn/static/js/merge/login.merge.js': '//static.iyixiang.cn/static/js/merge/login.merge.js?156e4a',
            '//static.iyixiang.cn/static/js/merge/register.merge.js': '//static.iyixiang.cn/static/js/merge/register.merge.js?012a46',
            '//static.iyixiang.cn/static/css/merge/index.merge.css': '//static.iyixiang.cn/static/css/merge/index.merge.css?2a5141',
            '//static.iyixiang.cn/static/css/merge/login.merge.css': '//static.iyixiang.cn/static/css/merge/login.merge.css?cdad5e',
            '//static.iyixiang.cn/static/css/merge/register.merge.css': '//static.iyixiang.cn/static/css/merge/register.merge.css?e32277'
        }[url]
    }
}