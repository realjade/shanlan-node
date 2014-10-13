/**
 * @name zhangyy-g@grandsoft.com.cn
 * @description zhangyy's code
 * Date: 14-9-23
 * Time: 下午9:41
 *
 */
(function ($) {
    var profileIndex = {

        __container: null,

        init: function (container) {
            var self = this
            self.__container = container

            self.__bindEvent()
        },

        __bindEvent: function () {
            var self = this
            var container = self.__container

            container.on('click', '.photo-group', function () {
                self.__initImageView($(this).data('id'))
            })
        },

        __initImageView: function (gid) {
            var self = this
            App.common.modules.imageView.init(null, {
                showDialog: true,
                groupTitle: '婆娑',
                groupDescription: '来生再见',
                imgData: [
                    {
                        id: 1,
                        thumbnailPath: '//static.jspass.com/static/css/module/images/imageview/1.jpg',
                        path: '//static.jspass.com/static/css/module/images/imageview/1.jpg'
                    },
                    {
                        id: 2,
                        thumbnailPath: '//static.jspass.com/static/css/module/images/imageview/2.jpg',
                        path: '//static.jspass.com/static/css/module/images/imageview/2.jpg'
                    },
                    {
                        id: 3,
                        thumbnailPath: '//static.jspass.com/static/css/module/images/imageview/3.jpg',
                        path: '//static.jspass.com/static/css/module/images/imageview/3.jpg'
                    },
                    {
                        id: 4,
                        thumbnailPath: '//static.jspass.com/static/css/module/images/imageview/4.jpg',
                        path: '//static.jspass.com/static/css/module/images/imageview/4.jpg'
                    },
                    {
                        id: 4,
                        thumbnailPath: '//static.jspass.com/static/css/module/images/imageview/4.jpg',
                        path: '//static.jspass.com/static/css/module/images/imageview/4.jpg'
                    },
                    {
                        id: 4,
                        thumbnailPath: '//static.jspass.com/static/css/module/images/imageview/4.jpg',
                        path: '//static.jspass.com/static/css/module/images/imageview/4.jpg'
                    },
                    {
                        id: 4,
                        thumbnailPath: '//static.jspass.com/static/css/module/images/imageview/4.jpg',
                        path: '//static.jspass.com/static/css/module/images/imageview/4.jpg'
                    },
                    {
                        id: 4,
                        thumbnailPath: '//static.jspass.com/static/css/module/images/imageview/4.jpg',
                        path: '//static.jspass.com/static/css/module/images/imageview/4.jpg'
                    },
                    {
                        id: 4,
                        thumbnailPath: '//static.jspass.com/static/css/module/images/imageview/4.jpg',
                        path: '//static.jspass.com/static/css/module/images/imageview/4.jpg'
                    },
                    {
                        id: 4,
                        thumbnailPath: '//static.jspass.com/static/css/module/images/imageview/4.jpg',
                        path: '//static.jspass.com/static/css/module/images/imageview/4.jpg'
                    },
                    {
                        id: 4,
                        thumbnailPath: '//static.jspass.com/static/css/module/images/imageview/4.jpg',
                        path: '//static.jspass.com/static/css/module/images/imageview/4.jpg'
                    },
                    {
                        id: 4,
                        thumbnailPath: '//static.jspass.com/static/css/module/images/imageview/4.jpg',
                        path: '//static.jspass.com/static/css/module/images/imageview/4.jpg'
                    },
                    {
                        id: 4,
                        thumbnailPath: '//static.jspass.com/static/css/module/images/imageview/4.jpg',
                        path: '//static.jspass.com/static/css/module/images/imageview/4.jpg'
                    },
                    {
                        id: 4,
                        thumbnailPath: '//static.jspass.com/static/css/module/images/imageview/4.jpg',
                        path: '//static.jspass.com/static/css/module/images/imageview/4.jpg'
                    },{
                        id: 4,
                        thumbnailPath: '//static.jspass.com/static/css/module/images/imageview/4.jpg',
                        path: '//static.jspass.com/static/css/module/images/imageview/4.jpg'
                    },{
                        id: 4,
                        thumbnailPath: '//static.jspass.com/static/css/module/images/imageview/4.jpg',
                        path: '//static.jspass.com/static/css/module/images/imageview/4.jpg'
                    },{
                        id: 4,
                        thumbnailPath: '//static.jspass.com/static/css/module/images/imageview/4.jpg',
                        path: '//static.jspass.com/static/css/module/images/imageview/4.jpg'
                    },{
                        id: 4,
                        thumbnailPath: '//static.jspass.com/static/css/module/images/imageview/4.jpg',
                        path: '//static.jspass.com/static/css/module/images/imageview/4.jpg'
                    },{
                        id: 4,
                        thumbnailPath: '//static.jspass.com/static/css/module/images/imageview/4.jpg',
                        path: '//static.jspass.com/static/css/module/images/imageview/4.jpg'
                    },{
                        id: 4,
                        thumbnailPath: '//static.jspass.com/static/css/module/images/imageview/4.jpg',
                        path: '//static.jspass.com/static/css/module/images/imageview/4.jpg'
                    },{
                        id: 4,
                        thumbnailPath: '//static.jspass.com/static/css/module/images/imageview/4.jpg',
                        path: '//static.jspass.com/static/css/module/images/imageview/4.jpg'
                    },{
                        id: 4,
                        thumbnailPath: '//static.jspass.com/static/css/module/images/imageview/4.jpg',
                        path: '//static.jspass.com/static/css/module/images/imageview/4.jpg'
                    }
                ]
            })
        }
    }

    $(function () {
        profileIndex.init($('.mod-profile'))
        App.common.modules.profileLayout.init($('.mod-profile-header-wrap'))
        $("img.lazy").lazyload();
    })


})(jQuery)