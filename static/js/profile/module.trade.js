/**
 * @name Edwin
 * @description
 * Date: 2014/9/30
 * Time: 13:53
 *
 */
(function($){
    var profileTrade = {

        __container: null,

        init: function(container){
            var self = this
            self.__container = container
        }
    }

    $(function(){
        profileTrade.init($('.mod-trade'))
        App.common.modules.profileLayout.init($('.mod-profile-header-wrap'))
    })


})(jQuery)