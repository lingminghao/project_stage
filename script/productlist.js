loadheader()
function loadheader(){
  $('.header').load('./header.html')
}
(function(){
  $('.foot').load('./foot.html')
})();

if($('.hosturl .tyname').text() == $('.protypelist .uname').text()){
  $('.protypelist .uname').css('color','red')
 }

 $('.brand .brandmore').on('click',function(){
 if($('.brandmore').text()=='更多'  ){
    $('.brandtype').css('height','120')
    $('.brandname').css('height','120')
    $('.brandmore').text('收起')  
 }else if($('.brandmore').text() == '收起' ){
  $('.brandtype').css('height','40')
  $('.brandname').css('height','40')
  $('.brandmore').text('更多')  
 }
})

$('.brandtype li').each(function (index,item){
  $(item).click(function (){
    $(item).addClass('tabcolor').siblings().removeClass('tabcolor')
    var str = ">"+$('.brandtype .tabcolor a').text()
    if($('.brandtype .tabcolor a').text() == '全部'){
      $('.hosturl .brandelse').text('')
    }else{
      $('.hosturl .brandelse').text(str)
    }
  })
}) 

$('.orderby ul li').each(function (index,item){
  $(item).click(function (){
    $(item).addClass('taborder').siblings().removeClass('taborder')
    
  })
}) 


// (function (){

//   // 点击加入购物车
//   $('.goodlist ul li .iconfont').on('click','.goodlist ul li .getid',function (){
//     // 存储商品id和数量
//     // "goods"=>"[{'id':'abc4','num':2},{'id':'abc2','num':1}]"
//     var id = $(this).val()//当前点击商品的id
//     console.log(id);
//     var goodsArr = []//购物车数据的数组
    
//     // if (localStorage.getItem('goods')) {
//     //   goodsArr = JSON.parse( localStorage.getItem('goods') )
//     // }
//     // // 标记购物车是否已有该商品
//     // var flag = false
//     // // 判断购物车是否已有该商品
//     // $.each(goodsArr,function (index,item){
//     //   if (item.id === id) {//购物车已该商品
//     //     item.num++//商品数量+1
//     //     flag = true
//     //   }
//     // })
//     // var price = $(this).siblings('.goods p').html();
//     // if (!flag) {
//     //   // push一个商品对象到goodsArr
//     //   goodsArr.push({"id":id,"num":1,"price":price})
//     // }
//     // // 数据更新到本地存储
//     // localStorage.setItem('goods', JSON.stringify(goodsArr) )
//     // alert('加入购物车成功！')
//   })

// })();

window.onload =function(){
  (function(){
    $.ajax({
      url:'./data/productlist.json',
      type:'get',
      dataType: 'json',
      cache: false,
      success:function(json){
        var domStr = ''
        $.each(json,function (index,item){
          domStr += `
          <li>
                <img src="${item.goodimg}" >
                <a href="particulars.html?getid=${item.goodid}">${item.goodtitle}</a>
                <p>￥${item.goodprice} <span class="iconfont icon-huaban5 clickone" data-id=${item.goodid}></span></p>
                <p style="display: none;" class="getid">${item.goodid}</p>
              </li>
          `
      })
      $('.goodlist ul').html(domStr)
    }
    })
  })();

  $('.goodlist ul').on('click','li p .clickone',function (){
    var id = $(this).attr('data-id')//当前点击商品的id
    
    var goodsArr = []
    if (localStorage.getItem('goods')) {
      goodsArr = JSON.parse( localStorage.getItem('goods') )
    }
    // 标记购物车是否已有该商品
    var flag = false
    // 判断购物车是否已有该商品
    $.each(goodsArr,function (index,item){
      if (item.id === id) {//购物车已该商品
        item.num++//商品数量+1
        flag = true
      }
    })
    var s = $(this).parent().text()
    var str2 = new String(s);
    var price = str2.substr(1)
    if (!flag) {
      goodsArr.push({"id":id,"num":1,"price":price})
    }
    localStorage.setItem('goods', JSON.stringify(goodsArr) )
    alert('加入购物车成功！')
    window.location.href="shopcart.html"
  })

  //购物车中商品数量
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


