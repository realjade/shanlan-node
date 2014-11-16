/**
 * author: zhangyy-g@grandsoft.com.cn
 * description: small 
 */
$(function(){
    /**提示smallnot**/
    var SmallNote=function(o){
        this.options={
            top: 0, time: 4000, pattern: null,text:'加载中...',hold:false,remove:false,callback:jQuery.noop
        };
        jQuery.extend(this.options, o);
        var element = this.element = jQuery('<div class="mod-smallnote">' + this.options.text + '</div>');
        element.css({top: this.options.top});
        
        // 额外的定制样式 目前支持的只有一种： error
        // 如果传递额外的类型 需要自行定义style, 需要注意的是class会自动添加前缀：supernatant-[pattern]
        if(this.options.pattern !== null) {
            element.addClass('smallnote-' + this.options.pattern);
        }

        // 保持单例
        if(SmallNote.present) {
            SmallNote.present.__remove();
        }

        //remove:true，直接删掉
        if(!this.options.remove){
            SmallNote.present = this;
            $(document.body).append(element);
            this.__offset(element);
            if(!this.options.hold){
                // 启用销毁定时器
                this.__destroyTimer();
            }
        }
    };
    SmallNote.prototype={
        __destroyTimer: function() {
            var that = this;
            setTimeout(function() {
                that.element.fadeOut('slow', function() {
                    that.__remove();
                    that.options.callback.call(that);
                });
            }, this.options.time);
        },
        __remove:function(){
            return this.element && this.element.remove();
        },

        //居中
        __offset:function(element){
            var top = this.options.top,
                left = this.options.left;
            if(left == null) {
                left = (jQuery(window).width() - this.element.outerWidth()) / 2;
                left = Math.max(0, left);
            }
        
            // 如果TOP没有指定 那么垂直居中
            if(top == null) {
                top = 0;
            }
            
            // 如果元素不是fixed定位 那么加上滚动条距离
            if(this.element.css('position') != 'fixed') {
                left += jQuery(document).scrollLeft();
                top += jQuery(document).scrollTop();
            }
            
            element.css({left:left, top:top});
        }
    };
    function smallnote(text,options){
        var o;
        if(options){
            options.text=text;
            o=options;
        }else{
            o={text:text};
        }
        new SmallNote(o);
    }
    // export public method
    App.common.modules.smallnote = smallnote;
});