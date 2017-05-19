$(function(){
	$("#banner").load("index.html #banner",function(){
		//轮播图
		$.ajax({
			type:"get",
			url:"json/index-header.json",
			success:function(res){
				var html = "";
				/*console.log(res.length)
					console.log(res[1].img)*/
				for(var i in res){
					html += `
							<a href=""><li class="active" style="background: url(${res[i].img}) no-repeat 50%;"></li></a>
							`					
				}
				$(".banner-pic").html(html);
				var timer = setInterval(fn,1500)
				var index = 0;
				//轮播函数
				function fn(){
					index++;
					if(index>6){
						index = 0;
					}
					
					$(".banner-pic").animate({"margin-left":-1280},1000,function(){
						$(this).css("margin-left",0).find("a:first").appendTo(".banner-pic")						
					})
					
					$(".banner-btn li").eq(index).addClass("activeBtn").siblings().removeClass("activeBtn")					
				}
				//移入图片停止播放
				$(".banner-pic li").mouseover(function(){
					clearInterval(timer);
					
				})
				//移除开启定时器
				$(".banner-pic li").mouseleave(function(){
					timer = setInterval(fn,1500);
					
				})
				//点击按钮停止播放切对应图片
				$(".banner-btn li").click(function(){
					clearInterval(timer);
					index = $(this).index()-1;
					fn()
				})
				
			}			
		});
		
	})
	
	//中间广告
	$.ajax({
		type:"get",
		url:"json/index.json",
		success:function(res){
//			console.log(res.adCenter[3].images)
			var html = "";
			for(var i in res.adCenter){
				html += `
						<li><a href="#"><img src="img/${res.adCenter[i].images}" alt="" /></a></li>
						`
			}
			$("#ad-center").find("ul").html(html);
		}
	});

	//果园推荐
	$.ajax({
		type:"get",
		url:"json/index.json",
		success:function(res){
			
			//页面加载获取数据
			var html = "";
			var tuijian = res.fruitTuijian;
			for(var i in tuijian){
				var	str = "";
				
				if(tuijian[i].posSpan==""){
					str += `<span style="display:none">${tuijian[i].posSpan}</span>`
				}else{
					str += `<span>${tuijian[i].posSpan}</span>`
				}
				html += `
							<li>
								<a href=""><img src="img/${tuijian[i].images}" alt="" /></a>
								<div class="s-fon">
									<div class="s-name">${tuijian[i].sName}</div>
									<div class="s-unit">${tuijian[i].sUnit}</div>
									<div class="s-che" style="${tuijian[i].sChe}"></div>
								</div>
								<div class="pos-span">`
									+str+
								`</div>
							</li>
						`
			}
			$(".goods-list").find("ul").html(html);
			
			//鼠标滑过 图片的动画
			$(".goods-list").on("img",function(){
				
			})
			
			
		}
		
	});
	
})