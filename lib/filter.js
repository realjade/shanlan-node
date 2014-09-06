/**
 * @name zhangyy-g@grandsoft.com.cn
 * @description zhangyy's code
 * Date: 14-7-29
 * Time: 下午4:59
 *
 */
module.exports = {
    login: function(req, res, next){
         var user = res.locals.user;
         if(!user){
             res.redirect('/login');
         }
         next(user)
    }
}