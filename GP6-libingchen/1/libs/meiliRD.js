//插件写法开头判断
;+function (factory) {
	if (typeof define === "function" && define.amd) {
		define(["jquery"], factory);
	} else {
		factory(jQuery);
	}
}(function ($) {
	//负责渲染的构造函数；
	function meiliRD(url, ele) {
		this.url = url;
        this.wrap = $(ele);
       //判断地址和渲染容器是否取到没取到不执行
		if (this.url == "" || this.wrap.length == 0) return 0;
		this.init();
	}
	meiliRD.prototype = {
		constructor: meiliRD,
		init: function init() {
			//通过then方法处理ajax返回来的json
			this.load().then(function (res) {
				console.log(res);
				// console.log(1);
				this.goodjson = res.data.list
				// console.log(this.goodjson);
				this.render();
			}.bind(this));
		},
		load: function load() {
			//通过jq的ajax方法调写好的json并返回
			var option = {
				url: this.url,
				type: "GET",
				dataType: "jsonp"	
			};
            return $.ajax(option);    
		},
		render: function render() {
			this.html ="";
			//循环json数组的元素并渲染
			this.goodjson.forEach(function(element){
				this.html +=`
				<div class="beauty_poster data-ptp-item waterfall-frame-0  waterfall-optimise-show" style="width: 224px; top: 0px; left: 0px; float:left;padding-left:10px;margin-bottom:10px;">
                    <a href="" class="picBox lazyload-img-start lazyload-img-end" item-id="${element.item_id}" style="background-image: url(${element.image}); background-size: cover;"></a>
                    <div class="info">
                        <div class="part">
                            <div class="price">￥${element.price}</div>
                            <div class="collect">
                                <i class="icon-star"></i>
                                ${element.itemLikes}
                            </div>
                        </div>
                        <a href="" class="title">
                            <i class="icon-select"></i>
                            ${element.title}
                        </a>
                    </div>
                </div>
				`	
			}.bind(this));
			
			//添加到页面
			this.wrap.html(this.wrap.html()+this.html);	
		}
	};
	return meiliRD;
});