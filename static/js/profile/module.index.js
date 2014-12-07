/**
 * @name zhangyy-g@grandsoft.com.cn
 * @description zhangyy's code
 * Date: 14-9-23
 * Time: 下午9:41
 *
 */
(function ($) {
    'use strict'
    var profileIndex = {

        __container: null,

        init: function (container) {
            var self = this
            self.__container = container
        }
    }

    $(function () {
        profileIndex.init($('.mod-profile'))
        App.common.modules.profileLayout.init($('.mod-profile-header-wrap'))
    })


})(jQuery)