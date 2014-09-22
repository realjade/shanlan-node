module.exports = {
    staticFilter: function(url){
        return {
            '//static.iyixiang.cn/static/js/merge/account_message.merge.js': '//static.iyixiang.cn/static/js/merge/account_message.merge.js?f42b25',
            '//static.iyixiang.cn/static/js/merge/index.merge.js': '//static.iyixiang.cn/static/js/merge/index.merge.js?33a115',
            '//static.iyixiang.cn/static/js/merge/login.merge.js': '//static.iyixiang.cn/static/js/merge/login.merge.js?c5efd5',
            '//static.iyixiang.cn/static/js/merge/register.merge.js': '//static.iyixiang.cn/static/js/merge/register.merge.js?3033f2',
            '//static.iyixiang.cn/static/css/merge/account_message.merge.css': '//static.iyixiang.cn/static/css/merge/account_message.merge.css?6e892d',
            '//static.iyixiang.cn/static/css/merge/index.merge.css': '//static.iyixiang.cn/static/css/merge/index.merge.css?696425',
            '//static.iyixiang.cn/static/css/merge/login.merge.css': '//static.iyixiang.cn/static/css/merge/login.merge.css?fd1db1',
            '//static.iyixiang.cn/static/css/merge/register.merge.css': '//static.iyixiang.cn/static/css/merge/register.merge.css?2714a4'
        }[url]
    }
}