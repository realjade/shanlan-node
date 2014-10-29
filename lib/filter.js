/**
 * @name zhangyy-g@grandsoft.com.cn
 * @description zhangyy's code
 * Date: 14-7-29
 * Time: 下午4:59
 *
 */
var utils = require('./utils')
module.exports = {
    login: function (req, res, next) {
        var user = res.locals._user
        if (!user) {
            res.redirect('/login')
            return false
        }
        next()
    },

    optEnd: function(service, data, req){
        if(data.code != 200) return false
        //请求服务器完成后，需要处理的逻辑
        switch(service){
            case 'User.cutAvatar':
                utils.updateUser(req.session, {
                    photoPath: data.data
                })
                break

        }
    },

    isMobile: function(req){
        console.log(req.header('USER-AGENT'))
    }
}