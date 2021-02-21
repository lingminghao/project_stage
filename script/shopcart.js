loadheader()
function loadheader(){
  $('.header').load('./header.html')
}
(function(){
  $('.foot').load('./foot.html')
})();

(function (){

  if (localStorage.getItem('goods')) {
    // 获取购物车数据
    var goodsArr = JSON.parse( localStorage.getItem('goods') )
    // 获取所有数据
    $.ajax({
      url: './data/productlist.json',
      type: 'get',
      dataType: 'json',
      success: function (json){
        var domStr = ''
        $.each(json,function (index,item){
          $.each(goodsArr,function (i,obj){
            if (item.goodid === obj.id) {
              var count = item.goodprice * obj.num
              domStr += `
              <li class="info">
            <img src="${item.goodimg}">
            <p>${item.goodtitle}</p>
            <p class='goodprice'>${item.goodprice}</p>
            <p class="subnum">-</p><p class="num">${obj.num}</p><p class="addnum">+</p>
            <p class='sumprice'>${count}</p>
            <p data-id="${item.goodid}">删除</p>
          </li>
              `
            } 
          })
        })
        $('.goodinfo').html(domStr)
        // console.log($('.info .sumprice').html());
      }
    })

    
   
  } else {
    var newLi = `
    <div class="nogoods">        
        <img src="https://icon.zol-img.com.cn/ucdn/b-zol-com/1.0.2/img/shopping.f3cf1f2a.png">
        <p>购物车没有商品，快去勾选吧~</p>
        <a href="index.html">去首页</a>
      </div>
      `
    $('.cartinfo').html(newLi)
  }


})();
window.onload = function(){
  var losc = localStorage.getItem('goods')
  var str =losc.split('}')
  console.log(str);
  var somegoods = str.length-1
  if(str.length-1 <0){
    $('.mycart .cartnum').html('0')
  }else{
    $('.mycart .cartnum').html(somegoods)
  }
}