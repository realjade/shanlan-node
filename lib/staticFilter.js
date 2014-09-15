module.exports = {
    staticFilter: function(url){
        return {
            '//static.iyixiang.cn/static/js/merge/index.merge.js': '//static.iyixiang.cn/static/js/merge/index.merge.js?dbe710',
            '//static.iyixiang.cn/static/css/merge/index.merge.css': '//static.iyixiang.cn/static/css/merge/index.merge.css?99f844'
        }[url]
    }
}