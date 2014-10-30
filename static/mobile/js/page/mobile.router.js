/**
 * @name zhangyy-g@grandsoft.com.cn
 * @description zhangyy's code
 * Date: 14-10-30
 * Time: 下午3:58
 *
 */
(function ($) {
    'use strict'
    $(document).on('click', '.stateful', function (e) {
        Backbone.history.navigate(this.hash, true)
        return false
    })

    var Router = Backbone.Router.extend({

        routes: {
            '/': 'index'
        },

        index: function () {
            $.jps.publish('init-index', null)
        }
    })

    App.modules.Router = Router

})(jQuery)