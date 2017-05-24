define(function(){
	return {
		//加载头部
		"oload":function(){
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
			////手机果园下拉样式
			$("#header-center").find("#phone").mouseover(function(){
				$(this).css("background","white");
				$("#phone-fruit").css("display","block")
			})
			
			$("#header-center").find("#phone").mouseleave(function(){
				$("#header-center").find("#phone").css("background","#eee")
				$("#header-center").find("#phone-fruit").css("display","none")
			})
		},
		
		//底部加载
		"toolbtnfoot":function(){
			//底部悬浮按钮
			$(".return-top").click(function(){
				$("body html").animate({"scrollTop":0},1000)
			})
			
		}
	}
})