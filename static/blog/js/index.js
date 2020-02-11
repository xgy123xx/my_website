$(document).ready(function () {
    console.log("hi");

    // 编写中间部分滚动图效果
    function changeLiActive(select_li) {
        $(select_li).addClass('active').siblings('li').removeClass('active');
        let imgSrc = $(select_li).children('img').attr("src");
        $(select_li).parent('ul').prev('img').attr({"src":imgSrc});
      }
    $('.slide_wrapper .slide_lists li').click(function () {
        changeLiActive($(this));
      })
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
      },5000)
      //编写左侧导航栏 点击按钮效果
      var LeftUl = document.getElementsByClassName("left-btn")[0];
      var LeftLi = LeftUl.getElementsByTagName("li");
      for(let i = 0;i < LeftLi.length;i++){
        // console.log(i);
        LeftLi[i].index = i
        LeftLi[i].onclick = function () {
              console.log(this.index);
              // 遍历所有li标签，删除class中active元素，对点击的元素添加active
              for (let index = 0; index < LeftLi.length; index++) {
                LeftLi[index].classList.remove("active");
              }
              LeftLi[this.index].classList.add("active");
              return false;
          }
      }



  });