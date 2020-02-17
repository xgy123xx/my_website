/**
 * Created by Administrator on 2020/2/17.
 */
$(function () {
        // 编写中间部分滚动图效果
    //console.log("123");
    function changeLiActive(select_li) {
        $(select_li).addClass('active').siblings('li').removeClass('active');
        let imgSrc = $(select_li).children('img').attr("src");
        $(select_li).parent('ul').prev('img').attr({"src":imgSrc});
    }
    $('.slide_wrapper .slide_lists li').click(function () {
        console.log("hihihi");
        changeLiActive($(this));
    });
    //编写自动滚动图片
    var autoSlide = setInterval(function () {
        //不使用触发器，触发单击事件，因为用户点击图片时，必须停止计时器
        // $(".slide_lists li[class*=active]+li").trigger("click");
        let next_li =  $(".slide_lists li[class*=active]+li");
        // console.log(next_li.length);
        if(next_li.length){
            changeLiActive(next_li)
        }else{
            changeLiActive($(".slide_lists li:first"));
        }
    },5000);
});