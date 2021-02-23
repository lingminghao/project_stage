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
            <p data-id="${item.goodid}" class='del'>删除</p>
          </li>
              `
            } 
          })
        })
        
        $('.goodinfo').html(domStr)
        console.log($('.goodinfo .info'));
        // console.log($('.info .sumprice').html());
        var allprice = 0
        var listp = $('.goodinfo .info').children('.sumprice')
        console.log(listp);
        $.each(listp,function(index,intem){
          allprice+=parseInt($(listp[index]).html())
        })
        
        $('.cartbox .allprice').html(allprice)
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
  //购物车数量
  var losc = localStorage.getItem('goods')
  if(localStorage.length){
    var str =losc.split('}')
    var somegoods = str.length-1
    if(str.length-1 <=0){
      $('.mycart .cartnum').html('0')
    }else{
      $('.mycart .cartnum').html(somegoods)
    }
  }else{
    $('.mycart .cartnum').html('0')
  }
  

  //商品加减
  $('.goodinfo').on("click",'.info .addnum',function(){
    var add = parseInt($(this).prev().html())+1 
    $(this).prev().html(add)
    if(add>=10){
      $(this).prev().html(10)
    }
    var sum = parseInt($('.goodprice').text())*parseInt($(this).prev().html())
    $(this).next().html(sum);
    var allprice = 0
    var listp = $('.info .addnum').next()
    $.each(listp,function(index,intem){
      allprice+=parseInt($(listp[index]).html())
    })
    $('.cartbox .allprice').html(allprice)
  })


  $('.goodinfo').on("click",'.info .subnum',function(){
    var sub = parseInt($(this).next().html())-1 
    $(this).next().html(sub)
    if(sub<1){
      $(this).next().html(1)
    }
    var sum = parseInt($('.goodprice').text())*parseInt($(this).next().html())
     $(this).next().next().next().html(sum);

     var allprice = 0
     var listp = $('.info .subnum').next().next().next()
     $.each(listp,function(index,intem){
       allprice+=parseInt($(listp[index]).html())
     })
     $('.cartbox .allprice').html(allprice)
  })

  $('.goodinfo').on('click','.info .del',function(){
    var goodsArr = JSON.parse( localStorage.getItem('goods') )
    var id = $(this).attr('data-id')
      $.each(goodsArr,function (index,item){
        if (item.id === id) {
          goodsArr.splice(index,1)
          return false
        }
      })
      // 删除dom结构
      
      $(this).parent().remove()
      $('.mycart .cartnum').html($('.goodinfo').children().length)
      //删除计算总价
      var allprice = 0
      var listp = $('.goodinfo').children()
      console.log(listp);
      $.each(listp,function(index,intem){
       allprice+=parseInt($(listp[index]).children('.sumprice').html())
     })
     $('.cartbox .allprice').html(allprice)

      // 更新本地存储的数据
      localStorage.setItem('goods',JSON.stringify(goodsArr))
      if (goodsArr.length <= 0) {
        localStorage.removeItem('goods')
        var newLi = `
        <div class="nogoods">        
        <img src="https://icon.zol-img.com.cn/ucdn/b-zol-com/1.0.2/img/shopping.f3cf1f2a.png">
        <p>购物车没有商品，快去勾选吧~</p>
        <a href="index.html">去首页</a>
      </div>
      `
      $('.cartinfo').html(newLi)
      var losc = localStorage.getItem('goods')
      if(localStorage.length){
        var str =losc.split('}')
        var somegoods = str.length-1
        if(str.length-1 <=0){
          $('.mycart .cartnum').html('0')
        }else{
          $('.mycart .cartnum').html(somegoods)
        }
      }else{
        $('.mycart .cartnum').html('0')
      }
      }
  })
 
  $('.cartbox .clearall').on('click',function(){
    var newLi = `
        <div class="nogoods">        
        <img src="https://icon.zol-img.com.cn/ucdn/b-zol-com/1.0.2/img/shopping.f3cf1f2a.png">
        <p>购物车没有商品，快去勾选吧~</p>
        <a href="index.html">去首页</a>
      </div>
      `
    $('.cartinfo').html(newLi)
    localStorage.removeItem('goods')
    var losc = localStorage.getItem('goods')
  if(localStorage.length){
    var str =losc.split('}')
    var somegoods = str.length-1
    if(str.length-1 <=0){
      $('.mycart .cartnum').html('0')
    }else{
      $('.mycart .cartnum').html(somegoods)
    }
  }else{
    $('.mycart .cartnum').html('0')
  }
  })
}
