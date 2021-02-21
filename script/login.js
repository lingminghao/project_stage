loadheader()
function loadheader(){
  $('.header').load('./header.html')
}
(function(){
  $('.foot').load('./foot.html')
})();


//登录
$('.wrap').on('submit',function(){
  var account = $('.phnoenumber').val()
  var password = $('.pw').val()
  if (account==='123456'&&password==='123456') {
    // 保存登录状态
    setCookie({
      key: 'login',
      val: 'loginSuccess',
      days: 3
    })
      // 保存账号密码
      setCookie({
        key: 'user',
        val: account,
        days: 15
      })
      setCookie({
        key: 'pass',
        val: password,
        days: 15
      })
    
  } else {
    alert('账号或密码错误！')
    return false//阻止表单提交
  }
})

