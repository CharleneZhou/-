requirejs.config({
	paths:{ //配置文件移入需要的模块  并起别名
		 jquery:"jquery-1.11.1.min",
		 hearderWrap : "hearder-wrap",
		 log:"log"
	}
})

requirejs(["jquery","hearderWrap","log"],function($,hW,log){
	////图片加载
		$("#hearder-wrap").load("hearder.html header",function(){
			hW.oload()
		})
		
		//底部
		//底部加载
	$("#foot-box").load("foot.html #footer",function(){
		
	})
	
	//底部悬浮按钮
	$("#toolbtnfoot").load("toolbtnfoot.html .toolbtnfoot",function(){
		hW.toolbtnfoot()
	})
	//正则验证
	log.login()
})
