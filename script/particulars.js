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

        console.log(json);
        var domStr1 = ''
        var domStr2 = ''
        $.each(json,function (index,item){
          
          if(s == item.goodid){  
            // console.log(item.setname[0]);     
          domStr1 += `
          <div class="goodleft">
          <div class="goodimgs"><img src="${item.goodimg}"></div>
          <ul class="minimg">
            <li><</li>
            <li><img src="${item.banner1}"></li>
            <li><img src="${item.banner2}"></li>
            <li><img src="${item.banner3}"></li>
            <li><img src="${item.banner4}"></li>
            <li><img src="${item.banner5}"></li>
            <li>></li>
          </ul>
        </div>
        <div class="goodright">
            <p class="goodname">${item.goodtitle}</p>
            <div class="goodprice">
              <span>价格：</span>
              <span>￥${item.goodprice}</span>
            </div>
            <div class="num"><p>数量：</p><p>-</p><p>1</p><p>+</p></div>
            <div class="addcart">加入购物车</div>
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

   
}
