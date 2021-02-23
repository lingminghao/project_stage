loadheader()
function loadheader(){
  $('.header').load('./header.html')
}
(function(){
  $('.foot').load('./foot.html')
})();


window.onload = function(){
  
  (function(){
    function getQueryString(key){
      var url = location.href;
      var searchStr = url.split('?')[1];
      var reg = new RegExp('[&]?'+key+'=([^&#]*)[&]?','i');
      var arr = searchStr.match(reg);
      return (RegExp.$1);
    }
    var s = getQueryString('getid')


    
    $.ajax({
      url:'./data/productlist.json',
      type:'get',
      dataType: 'json',
      cache: false,
      success:function(json){
        var domStr1 = ''
        var domStr2 = ''
        $.each(json,function (index,item){
          
          if(s == item.goodid){  
            // console.log(item.setname[0]);     
          domStr1 += `
          <div class="goodleft">
          <div class="goodimgs"><img src="${item.goodimg}"></div>
          <ul class="minimg">

            <li><img src="${item.banner1}"></li>
            <li><img src="${item.banner2}"></li>
            <li><img src="${item.banner3}"></li>
            <li><img src="${item.banner4}"></li>
            <li><img src="${item.banner5}"></li>

          </ul>
        </div>
        <div class="goodright">
            <p class="goodname">${item.goodtitle}</p>
            <div class="goodprice">
              <span>价格：</span>
              <span class='getprice'>￥${item.goodprice}</span>
            </div>
            <div class="num">
                <p>数量：</p>
                <p class="subnum">-</p>
                <p class="numgoods">1</p>
                <p class="addnum">+</p>
              </div>
              <div class="addcart" id="clis">加入购物车</div>
        </div>
          `
          
          
              
            
          
         var arr = []
          for(j = 0; j < item.setname.length; j++) {
            domStr2 = 
            '<li><p class="name">'+item.setname[j]+'</p><p class="set">'+item.setint[j]+'</p></li>'
            arr.push(domStr2)
          } 

          var htm = arr.join('')

          $('.settings').html(htm)
        }
        
      })
      $('.goodinfo').html(domStr1)
    }
    })

   
   })();

   (function(){
    $.ajax({
      url:'./data/hotgoods.json',
      type:'get',
      dataType: 'json',
      cache: false,
      success:function(json){
        var domStr = ''
        $.each(json,function (index,item){
          domStr += `
          <li>
          <img src="${item.goodsimg}">
          <p class="hotname">${item.goodsname}</p>
          <p class="hotprice">${item.goodsprice}</p>
        </li>
          `
      })
      $('.goodwell .hotjosn').html(domStr)
    }
    })
  })();
  
  $('.goodinfo').on("click",'.goodright .num .addnum',function(){
    var add = parseInt($(this).prev().html())+1 
    $(this).prev().html(add)
    if(add>=10){
      $(this).prev().html(10)
    }
    
  })
  $('.goodinfo').on("click",'.goodright .num .subnum',function(){
    var sub = parseInt($(this).next().html())-1 
    $(this).next().html(sub)
    if(sub<1){
      $(this).next().html(1)
    }
  })


  function getQueryString(key){
    var url = location.href;
    var searchStr = url.split('?')[1];
    var reg = new RegExp('[&]?'+key+'=([^&#]*)[&]?','i');
    var arr = searchStr.match(reg);
    return (RegExp.$1);
  }
  var idnum = getQueryString('getid')
  $('.goodinfo').on("click",'.goodright .addcart',function(){
    console.log(parseInt($('.num .numgoods').html()) );
    console.log( );
    
    var id = idnum//当前点击商品的id
    var goodsArr = []
    if (localStorage.getItem('goods')) {
      goodsArr = JSON.parse( localStorage.getItem('goods') )
    }
    // 标记购物车是否已有该商品
    var flag = false
    // 判断购物车是否已有该商品
    $.each(goodsArr,function (index,item){
      if (item.id === id) {//购物车已该商品
        var havenum = parseInt($('.num .numgoods').html())
        item.num = item.num + havenum
        flag = true
      }
    })
    var subp = $('.goodprice .getprice').html();
    var price = parseInt(subp.substring(1)) 
    var num = parseInt($('.num .numgoods').html())
    if (!flag) {
      goodsArr.push({"id":id,"num":num,"price":price})
    }
    localStorage.setItem('goods', JSON.stringify(goodsArr) )
    alert('加入购物车成功！')
    window.location.href="shopcart.html"
  })

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

  $('.goodinfo').on('mouseenter','.minimg li',function(){
    var urlphoto = $(this).children().attr('src')
    $(this).parent().prev().children().attr('src',urlphoto)
  })

  
  
}
