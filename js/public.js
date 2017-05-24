$(function(){
	//加载头部
	$("#hearder-wrap").load("html/hearder.html header",function(){
		//图片加载
		
		//地址下拉样式
		$("#header-left").find("#citybig").mouseover(function(){
			$(this).css("background","white")
			$("#header-left").find("#city").css({
				"display":"block"
			})
		})
		
		$("#header-left").find("#citybig").mouseleave(function(){
			$("#header-left").find("#address").css("background","#eee")
			$("#header-left").find("#city").css({
				"display":"none"
			})
		})
		//手机果园下拉样式
		$("#header-center").find("#phone").mouseover(function(){
			$(this).css("background","white");
			$("#phone-fruit").css("display","block")
		})
		
		$("#header-center").find("#phone").mouseleave(function(){
			$("#header-center").find("#phone").css("background","#eee")
			$("#header-center").find("#phone-fruit").css("display","none")
		})
	});
	//导航栏加载
	$("#hearder-content").load("html/nav.html",function(){
		//页面跳转样式
		$(".nav-center").find("li").each(function(){
			$(this).one("click",function(){
				$(this).addClass("current").siblings().removeClass("current");
			})
		})
		
		
		$(".nav-center").find("li").first().addClass("current");
		console.log(location.href)
//		$(".nav-center").find("li").eq(1).addClass("current");
		
		
		
		//搜索框
		$("#sousuo").val("奇异果");
		$("#sousuo").keyup(function(){
			$(".subsearch").html("");
			$.ajax({
				type:"get",
				url:"json/nav.json",
				success:function(res){
					var html = "";
					var search = res.subsearch;
					
					for(var i in search){
						html += `<li>${search[i].keyword}</li>`
//						console.log(search[i].keyword)
//						console.log(sousuo.value)
						if(search[i].keyword.indexOf(sousuo.value)>=0){
							$(".subsearch").html(html);
						}
					}			
					
					
					
					/*给li添加样式
					var oLi =  $(".subsearch").find("li");
					for(var j=0;j<oLi.length;j++){
						oLi[j].onclick=function(){
							
							$("#sousuo")[0].value = this.innerHTML;
							$(".subsearch").css({
								"display":"none",
								"opacity":0
							})
						}
					}*/
					
					$(".subsearch").find("li").click(function(){
						$("#sousuo")[0].value = this.innerHTML;
							$(".subsearch").css({
								"display":"none",
								"opacity":0
							})
					})
					
					
					
					
				}
			});
			
		})
		$("#sousuo").click(function(){
			$(".subsearch").css({
				"display":"block",
				"opacity":1
			})
		}).siblings().click(function(){
			$(".subsearch").css({
				"display":"none",
				"opacity":0
			})
		})
	})
	
	//底部加载
	$("#foot-box").load("html/foot.html #footer",function(){
		
	})
	
	//底部悬浮按钮
	$("#toolbtnfoot").load("html/toolbtnfoot.html .toolbtnfoot",function(){
		$(".return-top").click(function(){
			$("body html").animate({"scrollTop":0},1000)
		})
	})
	
})
