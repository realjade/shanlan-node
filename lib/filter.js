/**
 * @name zhangyy-g@grandsoft.com.cn
 * @description zhangyy's code
 * Date: 14-7-29
 * Time: 下午4:59
 *
 */
module.exports = {
    login: function (req, res, next) {
        var user = res.locals._user
        if (!user) {
            res.redirect('/login')
            return false
        }
        next()
    },

    wrapUser: function(user){
        var photoPath = user.photoPath

        if(photoPath && !user.avatar){
            user.avatar = {
                '30': '/img/' + photoPath.replace('X_X', '30'),
                '120': '/img/' + photoPath.replace('X_X', '120'),
                '200': '/img/' + photoPath.replace('X_X', '200')
            }
        }
        return user
    }
}