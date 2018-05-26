
define(["meiliRD"], function (meiliRD) {
        //通过实例化meiliRD并向其传参调用渲染函数
    var url = "http://mce.meilishuo.com/jsonp/get/3?offset=0&frame=1&trace=0&limit=10&endId=0&pid=106888&_=1526528205879";
    new meiliRD(url, ".waterfall-container");
});