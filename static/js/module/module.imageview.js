/**
 * author: zhangyy-g@grandsoft.com.cn
 * description: dialog
 */

(function ($) {
    var imageView = {

        __container: null,

        __options: null,

        __currentIndex: 0,

        init: function (container, options) {
            var self = this
            self.__container = container
            self.__options = $.extend({
                showDialog: true,
                imgData: [
                    {
                        id: '',
                        thumbnailPath: '',
                        filePath: ''
                    }
                ]
            }, options)

            if (options.showDialog) {
                self.__initDialog()
            } else {
                //不需要弹层的情况
            }

            self.__initThumbnail()

            self.__initGroup()

            self.__bindEvent()
        },

        __initDialog: function () {
            var self = this
            self.__scrollTop = $(window).scrollTop()
            var dialog = self.__dialog = new App.common.modules.Dialog({
                width: $(window).width(),
                height: $(window).height(),
                showTitle: false,
                isConfirm: false,
                message: self.__tpl
            })

            self.__panel = dialog.find('.mod-image-view')
        },

        __initGroup: function(){
            var self = this
            var panel = self.__panel
            var options = self.__options

            panel.find('.group-title').text(options.groupTitle).prop('title', options.groupTitle)
            panel.find('.group-desc').text(options.groupDescription).prop('title', options.groupDescription)
        },

        __initThumbnail: function () {
            var self = this
            var panel = self.__panel
            var options = self.__options
            var imgs = options.imgData

            $(Mustache.render(self.__thumbnailTpl, {img: imgs})).appendTo($('.t-items', panel))

            self.switchImg(0)
        },

        __bindEvent: function () {
            var self = this
            var panel = self.__panel

            panel.on('click', '.prev-btn', function () {
                if ($(this).hasClass('disabled')) return false
                self.switchImg(self.__currentIndex - 1)
            })

            panel.on('click', '.next-btn', function () {
                if ($(this).hasClass('disabled')) return false
                self.switchImg(self.__currentIndex + 1)
            })

            panel.on('click', '.t-item', function () {
                self.switchImg($(this).index())
            })

            panel.on('click', '.t-prev-btn', function () {
                if ($(this).hasClass('disabled')) return false
                self.__slideLeft()
            })

            panel.on('click', '.t-next-btn', function () {
                if ($(this).hasClass('disabled')) return false
                self.__slideRight()
            })

            panel.on('click', '.close', function () {
                self.__dialog.close()
            })
        },

        switchImg: function (index) {
            var self = this
            var panel = self.__panel
            var options = self.__options
            var imgs = options.imgData

            if (index < 0) return false
            if (index > imgs.length - 1) return false
            var img = imgs[index]

            //设置查看原图的href
            $('.realpath-btn', panel).prop('href', img.realPath)

            var imgPanel = panel.find('.image-panel')
            var thumbnailPanel = panel.find('.thumbnail-panel')

            self.__showImgLoading()
            var imgObj = new Image()
            imgObj.src = img.filePath

            imgObj.onload = function () {
                self.__hideImgLoading()

                imgPanel.empty()
                imgPanel.append(imgObj)

                var width = imgPanel.width()
                var height = imgPanel.height()
                var imgWidth = imgObj.width
                var imgHeight = imgObj.height

                var factHeight = width / imgWidth * imgHeight

                if (factHeight > height) {
                    $('img', imgPanel).css({
                        width: 'auto',
                        height: height
                    })
                } else {
                    $('img', imgPanel).css({
                        width: width,
                        height: 'auto'
                    })
                }
            }

            imgObj.onerror = function () {
                self.__hideImgLoading()
                imgPanel.html('<span>图片加载失败</span>')
            }

            $('.t-item', thumbnailPanel).removeClass('active').eq(index).addClass('active')

            self.__currentIndex = index

            if (index === 0) {
                $('.prev-btn', panel).addClass('disabled')
            } else {
                $('.prev-btn', panel).removeClass('disabled')
            }

            if (index === imgs.length - 1) {
                $('.next-btn', panel).addClass('disabled')
            } else {
                $('.next-btn', panel).removeClass('disabled')
            }

            self.__calItemsWidth()
        },

        __showImgLoading: function () {
            var self = this
            var panel = self.__panel
            $('<div class="loading"></div>').appendTo($('.image-panel', panel))
        },

        __hideImgLoading: function () {
            var self = this
            var panel = self.__panel
            panel.find('.loading').remove()
        },

        __calItemsWidth: function (offsetLeft) {
            var self = this
            var panel = self.__panel
            var wrapPanel = $('.t-wrap', panel)
            var itemsPanel = $('.t-items', panel)
            var currentItem = itemsPanel.find('.t-item').eq(self.__currentIndex)
            var prevBtn = $('.t-prev-btn', panel)
            var nextBtn = $('.t-next-btn', panel)

            var twidth = wrapPanel.width()
            var fwidth = itemsPanel.width()

            var left = parseInt(itemsPanel.css('left'), 10)

            if (fwidth <= twidth) {
                prevBtn.addClass('disabled')
                nextBtn.addClass('disabled')
                return false
            }

            if (typeof offsetLeft === 'undefined') {
                var oleft = currentItem.position().left
                offsetLeft = -(oleft - twidth / 2 + currentItem.width() / 2 + 1)
                left = offsetLeft
            } else {
                left += offsetLeft
            }

            if (left >= 0) {
                left = 0
            }

            if ((left + fwidth) <= twidth) {
                left = -fwidth + twidth
            }

            itemsPanel.css('left', left)

            if (left === 0) {
                prevBtn.addClass('disabled')
            } else {
                prevBtn.removeClass('disabled')
            }

            if (left === (twidth - fwidth)) {
                nextBtn.addClass('disabled')
            } else {
                nextBtn.removeClass('disabled')
            }
        },

        __slideLeft: function () {
            var self = this
            var panel = self.__panel
            var wrapPanel = $('.t-wrap', panel)

            self.__calItemsWidth(wrapPanel.width() / 2)
        },

        __slideRight: function () {
            var self = this
            var panel = self.__panel
            var wrapPanel = $('.t-wrap', panel)
            self.__calItemsWidth(-wrapPanel.width() / 2)
        }

    }

    imageView.__tpl = '' +
        '<div class="mod-image-view">' +
        '   <div class="group-info">' +
        '       <div>作品集：<span class="group-title"></span></div>' +
        '       <div class="group-desc"></div>' +
        '   </div>' +
        '   <div class="image-panel-wrap">' +
        '       <div class="image-panel"></div>' +
        '       <em class="prev-btn change-icon"></em>' +
        '       <em class="next-btn change-icon"></em>' +
        '   </div>' +
        '   <div class="thumbnail-panel">' +
        '       <!--em class="t-prev-btn"></em-->' +
        '       <div class="t-wrap">' +
        '           <div class="t-items"></div>' +
        '        </div>' +
        '       <!--em class="t-next-btn"></em-->' +
        '   </div>' +
        '   <a class="realpath-btn" target="_blank">查看原图</a>' +
        '   <em class="close"></em>' +
        '</div>'

    imageView.__thumbnailTpl = '{{#img}}<img class="t-item" data-id="{{id}}" data-filepath="{{filePath}}" data-realpath="{{realPath}}" src="{{thumbnailPath}}" />{{/img}}'

    App.common.modules.imageView = imageView

})(jQuery)