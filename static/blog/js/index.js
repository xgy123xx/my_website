$(document).ready(function () {
    console.log("hi");
    // 编写中间部分滚动图效果
    $('.slide_wrapper .slide_lists li').click(function () {
        $(this).addClass('active').siblings('li').removeClass('active');
        let imgSrc = $(this).children('img').attr("src");
        $(this).parent('ul').prev('img').attr({"src":imgSrc});
      })




  });