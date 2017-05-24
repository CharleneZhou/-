$(function(){
	//焦点轮播
	var index = 0;
	var timer = setInterval(autoPlay,5000);
	function autoPlay(){
		index++;
		if(index == $(".big").find("li").size()){
			index = 0;
		}
		$(".big li").eq(index).fadeIn().siblings().fadeOut();
		$(".small li").eq(index).addClass("cur").siblings().removeClass("cur");
	}
	
	$(".small li").hover(function(){
		clearInterval(timer);	
		index = $(this).index()-1;
		autoPlay();
	},function(){
		timer = setInterval(autoPlay,5000);
	})
	
	
	
	
	
	
	
})
