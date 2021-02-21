loadheader()
function loadheader(){
  $('.header').load('./header.html')
}
(function(){
    $('.foot').load('./foot.html')
  })();


$('.phone').on('blur',function(){
    var val = this.value.replace(/\s+/g,'')//去掉空格
    var reg = /^1[3456789]\d{9}$/
    if (reg.test(val)) {
      $('.phoneshow').css('display','none')
    } else {
      $('.phoneshow').css('display','block')
    }
})

$('.note').on('blur',function(){
  var val = this.value.replace(/\s+/g,'')//去掉空格
  var reg = /\d/
  if (reg.test(val)) {
    $('.noteshow').css('display','none')
  } else {
    $('.noteshow').css('display','block')
  }
})

$('.passtow').on('blur',function(){
  var val = this.value.replace(/\s+/g,'')//去掉空格
  var reg =/^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,20}$/
  if(reg.test(val)){
    if($('.passone').val() === $('.passtow').val()){  
      $('.passwoldshow').css('display','none')
    }else{
      $('.passwoldshow').css('display','block')
    }
  }else{
    $('.passwoldshow').css('display','block')
  } 
})

$('.account-name span').each(function (index,item){
  $(item).click(function (){
    $(item).addClass('hidden').siblings().removeClass('hidden')
    if($(item).hasClass('show')){
      $('.enter').css('visibility','visible')
    }else if($(item).hasClass('hidden')){
      $('.enter').css('visibility','hidden')
    }
  })
}) 