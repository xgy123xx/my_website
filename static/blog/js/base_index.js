
/**
 * Created by Administrator on 2020/1/19.
 */
$(function () {
    console.log("hello world");
    // 处理change-skin
    // 隐藏和显示部分部分
    $('#left-btn').click(function () {
        $('.small-img-show').stop().animate({width:'toggle'},350);
    });
    //设置点击图片就切换为背景  原生js
    //1.设置li标签的点击事件   chidren谷歌浏览器把回车文本节点当孩子节点
    var oDivSmallImg = document.getElementsByClassName('small-img-show')[0];
    var Olis = oDivSmallImg.getElementsByTagName('li');
    for(let i = 0;i < Olis.length;i++){
        Olis[i].onclick = function () {
            //2. 获取图片url  this == Olis[i]
            let ImgSrc = this.getElementsByTagName('img')[0].src;
            //3. 设置src为背景
            document.body.style.backgroundImage = `url("${ImgSrc}")`
        }
    }

});
