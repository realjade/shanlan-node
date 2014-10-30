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
        var phoneReg = "\\b(ip(hone|od)|android|opera m(ob|in)i"
        +"|windows (phone|ce)|blackberry"
        +"|s(ymbian|eries60|amsung)|p(laybook|alm|rofile/midp"
        +"|laystation portable)|nokia|fennec|htc[-_]"
        +"|mobile|up.browser|[1-4][0-9]{2}x[1-4][0-9]{2})\\b"

        var tableReg = "\\b(ipad|tablet|(Nexus 7)|up.browser"
        +"|[1-4][0-9]{2}x[1-4][0-9]{2})\\b"

        var agent = req.header('USER-AGENT').toLowerCase()
        if(!agent)
            return false

        if(!!new RegExp(phoneReg, 'igm').exec(agent) || !!new RegExp(tableReg, 'igm').exec(agent)){
            return true
        }
        return false
    }
}