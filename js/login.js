$(function(){
	//获取cookie
	/*if(document.cookie){
		
		unames = getCookie("cookieName");
		upwds = getCookie("cookiePassword");
		$("#uname").val(unames); 
		$("#upwd").val(upwds);
	 
	}*/
	
	
	$("#fr-login").click(function(){
		
		uname = $("#uname").val();
		upwd = $("#upwd").val();	
		var deffered = $.ajax({
			type:"get",
			url:"http://datainfo.duapp.com/shopdata/userinfo.php",
			data:{
				"status":"login",
				"userID":uname,
				"password":upwd
			}
		});
		deffered.done(function(res){
			
			switch(res){
				case "0":alert("用户名不存在，请注册");
						setTimeout(function(){
						 location.href = "http://127.0.0.1/Fruit-day/register.html";
						},3000)
						 break;						
				case "2": alert("用户名密码不符合");break;	
				default:alert("登录成功");
						setTimeout(function(){
						location.href = "http://127.0.0.1/Fruit-day/index.html";
						},3000)
						 break;
				
			}
		})
		
/*	//如果被选中则创建cookie
	console.log($("#bCheckBox:checked"))
	
		if($("#bCheckBox").prop("checked",true)){
			setCookie("cookieName",uname);
			setCookie("cookiePassword",upwd);
			
		}*/

	})
		$("#uname").blur(function(){
			
			if($("#bCheckBox")){
				alert()
			}else{
				console.log()
			}
		})
	
})

