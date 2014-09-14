module.exports = {
    staticFilter: function(url){
        return {
            '//static.iyixiang.cn/static/js/merge/index.merge.js': '//static.iyixiang.cn/static/js/merge/index.merge.js?dbe710',
            '//static.iyixiang.cn/static/js/merge/login.merge.js': '//static.iyixiang.cn/static/js/merge/login.merge.js?dcb2c6'
        }[url]
    }
}