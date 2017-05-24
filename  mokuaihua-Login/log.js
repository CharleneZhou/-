define(function(){
	return{
		"login":function(){
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
						
				
					})
						/*$("#uname").blur(function(){
							
							if($("#bCheckBox")){
							}else{
							}
						})*/
		}
	}
})