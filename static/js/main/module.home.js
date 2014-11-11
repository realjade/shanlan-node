/**
 * @name zhangyy-g@grandsoft.com.cn
 * @description zhangyy's code
 * Date: 14-10-9
 * Time: 下午11:45
 *
 */
(function ($) {
    var home = {
        __container: null,

        init: function (container) {
            var self = this;
            self.__container = container;

            self.__initPoster();

            self.__bindEvent();
        },

        __initPoster: function () {
            var carousel = $('#mycarousel'),
                slides = carousel.children('li'),
                references = $('#actionOpt').find('a');

            if (references.length <= 1) return;

            function updateReferences(index) {
                references.removeClass('checked2');
                references.eq(index).addClass('checked2');
            }

            carousel.jcarousel({
                auto: 5,
                scroll: 1,
                wrap: 'circular',
                buttonNextHTML: '<a href="javascript:;" id="nextCircle2" class="actArrow"> </a>',
                buttonPrevHTML: '<a href="javascript:;" id="preCircle2" class="actArrow"> </a>',
                initCallback: function (jc) {
                    references.each(function (i) {
                        slides.eq(i).attr('ref', i);
                        $(this)
                            .one('click', function (e) {
                                jc.options.auto = 0;
                            })
                            .click(function (e) {
                                e.preventDefault();
                                updateReferences(i);
                                jc.scroll(i + 1);
                            });
                    });
                },
                itemVisibleInCallback: {
                    onBeforeAnimation: function (jc, li, index, action) {
                        var ref_index = $(li).attr('ref');
                        references.removeClass('checked2');
                        references.eq(ref_index).addClass('checked2');
                    }
                }
            });
        },
        __bindEvent: function () {
            var self = this
            var container = self.__container

            // Poster Events
            container.on({
                mouseover: function () {
                    $('#preCircle2,#nextCircle2').css('opacity', 1);
                },
                mouseout: function () {
                    $('#preCircle2,#nextCircle2').css('opacity', 0);
                }
            }, '#actionContainer');

            container.on({
                mouseover: function () {
                    $('#preCircle2').css('background-image', 'url(//static.mgcheng.com/static/css/main/images/circle_right_arrow1.png)');
                },
                mouseout: function () {
                    $('#preCircle2').css('background-image', 'url(//static.mgcheng.com/static/css/main/images/normal_right.png)');
                }
            }, '#leftArea,#preCircle2');

            container.on({
                mouseover: function () {
                    $('#nextCircle2').css('background-image', 'url(//static.mgcheng.com/static/css/main/images/circle_left_arrow1.png)');
                },
                mouseout: function () {
                    $('#nextCircle2').css('background-image', 'url(//static.mgcheng.com/static/css/main/images/normal_left.png)');
                }
            }, '#rightArea,#nextCircle2');

            // Collection Events
            /*container.on({
             mouseover: function(){
             $(this).find('.c-bar.bar-top').css({
             top:'0px'
             });
             $(this).find('.c-bar.bar-bottom').css({
             bottom:'0px'
             })
             },
             mouseout: function(){
             $(this).find('.c-bar.bar-top').css({
             top:'-80px'
             });
             $(this).find('.c-bar.bar-bottom').css({
             bottom:'-80px'
             })
             }
             },'.c-block')*/

        }
    }

    $(function () {
        home.init($('.mod-home'))
    })
})(jQuery)