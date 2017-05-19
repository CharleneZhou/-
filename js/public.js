$(function(){
	//加载头部
	$("#hearder-wrap").load("html/hearder.html header",function(){
		//图片加载
		
		//地址下拉样式
		$("#header-left").find("#address").mouseover(function(){
			$(this).css("background","white")
			$("#header-left").find("#city").css({
				"display":"block"
			})
		})
		
		$("#header-left").find("#city").mouseleave(function(){
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
	$("#hearder-content").load("html/nav.html #nav",function(){
		
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
