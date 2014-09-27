module.exports = {
    staticFilter: function(url){
        return {
            '//static.jspass.com/static/js/merge/account_message.merge.js': '//static.jspass.com/static/js/merge/account_message.merge.js?f42b25',
            '//static.jspass.com/static/js/merge/index.merge.js': '//static.jspass.com/static/js/merge/index.merge.js?08c120',
            '//static.jspass.com/static/js/merge/login.merge.js': '//static.jspass.com/static/js/merge/login.merge.js?c5efd5',
            '//static.jspass.com/static/js/merge/profile_index.merge.js': '//static.jspass.com/static/js/merge/profile_index.merge.js?45cf60',
            '//static.jspass.com/static/js/merge/register.merge.js': '//static.jspass.com/static/js/merge/register.merge.js?3033f2',
            '//static.jspass.com/static/css/merge/account_message.merge.css': '//static.jspass.com/static/css/merge/account_message.merge.css?45799c',
            '//static.jspass.com/static/css/merge/index.merge.css': '//static.jspass.com/static/css/merge/index.merge.css?696425',
            '//static.jspass.com/static/css/merge/login.merge.css': '//static.jspass.com/static/css/merge/login.merge.css?fd1db1',
            '//static.jspass.com/static/css/merge/profile_index.merge.css': '//static.jspass.com/static/css/merge/profile_index.merge.css?23b5fd',
            '//static.jspass.com/static/css/merge/register.merge.css': '//static.jspass.com/static/css/merge/register.merge.css?2714a4'
        }[url]
    }
}