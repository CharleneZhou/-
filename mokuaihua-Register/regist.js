define(function(){
	return{
		//正则验证
		"regCheck":function(){
					var html = "";
					//用户名
					var flag = false;
					function Name(){
			
						var regName = /^13|15|17|18\d{9}$/;
						uname = $("#uname").val();
						if( regName.test(uname) ){
			
								html = `
							<span id="snamu" class="s" style="background: url(../img/icons.png) no-repeat -12px -360px;"></span>
							`
								$(".trName").children("td:last").html(html);
								return true;
							
							
						}else{
			
							html=`
							<span id="snamu" class="s" style="background: url(../img/icon-error.png);"></span>
							`
							$(".trName").children("td:last").html(html);
							return false
						}
			
					}
					//密码
					function Pwd(){
						var reg = /^.{6,20}$/;
						var pwd = $("#upwd").val();
						if(reg.test(pwd) ){
							
							html = `
							<span id="spwd" class="s" style="background: url(../img/icons.png) no-repeat -12px -360px"></span>
							`
							$(".trPwd").children("td:last").html(html)
							return true;
						}else{
							html = `
								<span id="spwd" class="s" style="background: url(../img/icon-error.png)"></span>
							`
							$(".trPwd").children("td:last").html(html)
							return false
						}
			
					}
					//确认密码
					function Qpwd(){
						
			
						var qpwd = $("#uqpwd").val();
						upwd = $("#upwd").val();
						if(upwd == qpwd && qpwd.length!=0){
							html = `
						<span id="sqpwd" class="s" style="background: url(../img/icons.png) no-repeat -12px -360px"></span>
							`
							$(".trQpwd").children("td:last").html(html)
							return true; 
						}else{
							html = `
								<span id="sqpwd" class="s" style="background: url(../img/icon-error.png);"></span>
							`
							$(".trQpwd").children("td:last").html(html)
							return false;
						}
			
					}
					//随机数
					function rand(min,max){
						return Math.floor( Math.random()*(max-min+1) + min );
					}
					//验证码
					fnCode()
					function fnCode(){
						var arr = [];
							for(var i = 0 ; i < 4 ; i++){
								var code = rand(48,122);
								
								while(code>=58&&code<=64 || code>=91&&code<=96){
									code = rand(48,122);
								}
								
								arr.push( String.fromCharCode(code) );
						
							}
							$(".code").html(arr.join(""));
							
					}
					$(".recode").click(function(){
						fnCode()
					})
					function Checkcode(){
			
						var ckCode = $("#ucheckcode").val();
			
						if( ckCode == $(".code").html() ){
							html = `
						<span id="scode" class="s" style="background: url(../img/icons.png) no-repeat -12px -360px"></span>
							`
							$(".trcheckcode").children("td:last").html(html);
							return true;
						}else{
							html = `
								<span id="scode" class="s" style="background: url(../img/icon-error.png);"></span>
							`
							$(".trcheckcode").children("td:last").html(html)
							return false
						}
					}
					
					$(".send").click(function(){
						
						if(Name() && Pwd() && Qpwd() && Checkcode()){
							$("#ucheckphone").prop("disabled",false)//取消被禁止
						}else{
							
						}
						
					})
			
			$("#fr-register").click(function(){
					Name()  
					Pwd() 
					Checkcode()
					Qpwd() 
				var deffered = $.ajax({
					type:"get",
					url:"http://datainfo.duapp.com/shopdata/userinfo.php",
					data:{
						"status":"register",
						"userID":uname,
						"password":upwd
					}
				})	
				deffered.done(function(res){
						 
						if(Name() && Pwd() && Qpwd() && Checkcode()){
							switch(res){
								
								case "0":alert("此号码已经被注册，请直接登录吧");
										location.href = "http://127.0.0.1/Fruit-day/login.html";
										break;
								case "1":alert("注册成功了，您的页面将火速跳转到登录页面");
										setTimeout(function(){
										 location.href = "http://127.0.0.1/Fruit-day/login.html";
										},3000)
										 break;
								case "2": alert("注册失败，电脑当机了，来生再试吧");		
							}
						}else{
							
						}
						
						
			
				})	
			
			});
		}
		
		
	}
})