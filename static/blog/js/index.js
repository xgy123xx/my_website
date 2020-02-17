$(function () {
    //获取地址栏url
    var current_url = window.location.pathname;
    // console.log(current_url);
    // 遍历列表  
    var LeftLi = $('.left-container .left-btn li');
    // console.log(LeftLi);
    for(let i = 0;i <LeftLi.length;i++){
        var LeftLiUrl = LeftLi[i].children[0].pathname
        if(current_url.indexOf(LeftLiUrl) == 0){
            // console.log("yes");
            // 设置li标签属性为active
            LeftLi[i].classList.add("active");
        }
        
    }

});