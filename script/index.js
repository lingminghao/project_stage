loadheader()
function loadheader(){
  $('.header').load('./header.html')
}
(function(){
  $('.foot').load('./foot.html')
})();

(function(){
  $.ajax({
    url:'./data/phone.json',
    type:'get',
    dataType: 'json',
    cache: false,
    success:function(json){
      console.log(json)
      var domStr = ''
      $.each(json,function (index,item){
        domStr += `
        <div class="popular_item">
          <div class="proimg"><img src='${item.imgurl}'></div>
          <p class="proname">${item.title}</p>
          <p class="proprice">${item.price}</p>
          <button class="proshop" data-id="${item.id}">立即采购</button>
         </div>
        `
    })
    $('.popular_content').html(domStr)
  }
  })
})();
(function(){
  $.ajax({
    url:'./data/prolist.json',
    type:'get',
    dataType: 'json',
    cache: false,
    success:function(json){
      console.log(json)
      var domStr = ''
      $.each(json,function (index,item){
        domStr += `
        <div class="catgegory_title_box">
        <p>${item.ltitle}</p>
        <p>
          <a href="#">${item.rtitle1}</a>
          <a href="#">${item.rtitle2}</a>
          <a href="#">${item.rtitle3}</a>
          <a href="#">${item.rtitle4}</a>
        </p>
      </div>

      <div class="catgegory_content">
          <div class="catgegory_content_banner">
            <img src="${item.bannerimg}">
              <h3>${item.bannername}</h3>
          </div>
      </div>
      <ul class="catgegory_content_proList">
        <li>
          <img src="${item.prolist1}">
          <p>${item.protitle1}</p>
          <p>${item.proprice1}</p>
        </li>
        <li>
          <img src="${item.prolist2}">
          <p>${item.protitle2}</p>
          <p>${item.proprice2}</p>
        </li>
        <li>
          <img src="${item.prolist8}">
          <p>ThinkPad T450s(20BX002TCD)</p>
          <p>￥6699.00</p>
        </li>
        <li>
          <img src="${item.prolist3}">
          <p>ThinkPad T450s(20BX002TCD)</p>
          <p>￥6699.00</p>
        </li>
        <li>
          <img src="${item.prolist4}">
          <p>ThinkPad T450s(20BX002TCD)</p>
          <p>￥6699.00</p>
        </li>
        <li>
          <img src="${item.prolist5}">
          <p>ThinkPad T450s(20BX002TCD)</p>
          <p>￥6699.00</p>
        </li>
        <li>
          <img src="${item.prolist6}">
          <p>ThinkPad T450s(20BX002TCD)</p>
          <p>￥6699.00</p>
        </li>
        <li>
          <img src="${item.prolist7}">
          <p>ThinkPad T450s(20BX002TCD)</p>
          <p>￥6699.00</p>
        </li>
      </ul>
        `
    })
    $('.catgegory_info').html(domStr)
  }
  })
})();

// (function(){
//   // 判断是否已登录
//   console.log($('.haslogin').text());
//   if (getCookie('login')) {
//     console.log($('.haslogin').text());
//     $('.haslogin').text('已登入')
    
//   }
// })();
window.onload = function(){
  var mySwiper = new Swiper ('.swiper-container', {
    // direction: 'vertical', // 垂直切换选项
    direction: 'horizontal', // 水平切换选项
    loop: true, // 循环模式选项
    // autoplay:true,
    autoplay: {
      delay: 2000,
      stopOnLastSlide: false,
      disableOnInteraction: false,
    },
    
    // 如果需要分页器
    pagination: {
      el: '.swiper-pagination',
      clickable :true,
    },
    
    // 如果需要前进后退按钮
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
    
  })    
  //tab切换
  $('.login ul li').each(function (index,item){
    $(item).click(function (){
      $(item).addClass('active').siblings().removeClass('active')
      $('.login .show_login').eq(index).addClass('show').siblings().removeClass('show')
    })
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
  
}
 
