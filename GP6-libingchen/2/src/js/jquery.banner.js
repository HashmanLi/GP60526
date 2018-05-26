// OPT接收一个对象，其中包含（slide|fade），btn选择器，是否自动轮播
;+function ($) {
    $.Banner = function (OPT) {
        new Banner( OPT, this);
    }
    function Banner( OPT, ELEMENT_NODE) {
        this.init( OPT, ELEMENT_NODE);
    }
    Banner.prototype = {
        constructor: Banner,
        init(OPT, ELEMENT_NODE){
            //当前显示的下标;
            this.index = 0;
            // 选择容器;
            this.bannerWrapper = $(".banner-wrapper");
            //动画模式选择
            this.animate = OPT.animate ? OPT.animate : "fade";
            //容器中找的图片;
            this.bannerItem = this.bannerWrapper.children();

            // 分析选则是否loop
            if (OPT.autoPlay) {
                this.autoPlay();
            }
            // 设置banner尺寸
            this.bannerNum = this.bannerItem.length; 

            //btn按钮获取;
            if ( !OPT.nextBtn || !OPT.prevBtn) return;      //参数判断
            this.btnPrev = OPT.prevBtn;
            this.btnNext = OPT.nextBtn;
            
            // on的中间参数，添加一个对象默认为对象中的data属性
            this.btnPrev
                .on("click.changeIndex", { direc: "prev" }, $.proxy(this.checkindex, this))
                .on("click.animation", $.proxy(this.animation, this))
            this.btnNext
                .on("click.changeIndex", { direc: "next" }, $.proxy(this.checkindex, this))
                .on("click.animation", $.proxy(this.animation, this))
        },

        //控制索引的改变
        checkindex: function (event) {
            var turnList = {
                // 上一张  左边btn
                "prev": function () {
                    this.prev = this.index;
                    if (this.index == 0) {
                        this.index = this.bannerNum - 1;
                    } else {
                        this.index--;
                    }
                }.bind(this),
                // 下一张 右边btn
                "next": function () {
                    this.prev = this.index;
                    if (this.index == this.bannerNum - 1) {
                        this.index = 0;
                    } else {
                        this.index++;
                    }
                }.bind(this)

            }
            // on中间参数 data 
            if (!(typeof turnList[event.data.direc] == "function")) return 0;
            turnList[event.data.direc]();
        },


        animation: function (event) {
            if (this.prev == this.index) return 0;
            var animationList = {
                //slide效果
                "slide": function () {
                    animationList.slideFadeInit();
                    this.bannerItem.eq(this.index)
                        .addClass("active")
                        .css({
                            display: "none"
                        })
                        .slideDown()
                        .siblings()
                        .removeClass("active");
                }.bind(this),
                // 淡入淡出效果 
                "fade": function () {
                    animationList.slideFadeInit();
                    this.bannerItem.eq(this.index)
                        .addClass("active")
                        .css({
                            display: "none"
                        })
                        .fadeIn()
                        .siblings()
                        .removeClass("active");
                }.bind(this),
                "slideFadeInit": function () {
                    this.bannerItem.eq(this.prev)
                        .css({
                            zIndex: 1
                        })
                        .siblings()
                        .css({
                            zIndex: ""
                        })
                }.bind(this)
            }
            animationList[this.animate]();
            
        },
        // 自动轮播
        //思路：
         // 鼠标移入到banner区域清除定制器
         // 鼠标移除banner区域设置定时器
        autoPlay(){
            this.bannerWrapper.on("mouseenter", function () {
               
                clearInterval(this.loopTimer);
            }.bind(this))
            this.bannerWrapper.on("mouseleave", function () {
                
                clearInterval(this.loopTimer);
                this.loopTimer = setInterval(function () {//自动轮播
                    this.prev = this.index;
                    this.index = ++this.index % this.bannerNum;
                    this.animation();
                }.bind(this), 2000);
            }.bind(this))
            this.bannerWrapper.trigger("mouseleave");
        } 
    }
}(jQuery);


