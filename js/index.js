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
								<a href="http://127.0.0.1/Fruit-day/prodetail.html?num=${tuijian[i].num}"><img src="img/${tuijian[i].images}" alt="" /></a>
								<div class="s-fon">
									<div class="s-name">${tuijian[i].sName}</div>
									<div class="s-unit">${tuijian[i].sUnit}</div>
									<div class="s-che" style="${tuijian[i].sChe}"></div>
									<span style="display:none" data-num=${tuijian[i].num} data-images=${tuijian[i].images} data-price=${tuijian[i].price} data-name=${tuijian[i].name} data-guige=${tuijian[i].guige}></span>
								</div>
								<div class="pos-span">`
									+str+
								`</div>
							</li>
						`
			}
			$(".goods-list").find("ul").html(html);
			//鼠标滑过 图片的动画
			$(".goods-list").on("mouseenter","img",function(){
				$(this).css({
					"transform":"scale(1.1)",
					"transition":"0.3s"
				})
			}).on("mouseleave","img",function(){
				$(this).css({
					"transform":"scale(1)",
					"transition":"0.3s"
				})
			})
			
			
			$(".goods-list").find(".s-che").each(function(index){
				$(this).click(function(){
					//购物车弹出框
					$("#shop-cart").toggle();
					$("#zhezhao").toggle();
					$("#shop-cart").one("click",".cha img",function(){
						$("#shop-cart").toggle();
						$("#zhezhao").toggle();
					})
					$("#shop-cart").one("click",".btn-left a",function(){
						$("#shop-cart").toggle();
						$("#zhezhao").toggle();
					})
					$("#shop-cart").one("click",".btn-right a",function(){
						location.href="cart.html";
					})
					
					//添加到购物车
					var addNum1 = $(".nav-rLight").find("span").html()
					var arr = [];
					var flag = true;
					var d = {
						"num":$(this).next().data("num"),
						"name":$(this).next().data("name"),
						"images":$(this).next().data("images"),
						"price":$(this).next().data("price"),
						"guige":$(this).next().data("guige"),
						"count":1  //用来记录该商品添加了几次
					};
					//存cookie
//						var id = tuijian[index].num;
					oldCookie = $.cookie("data");
					if(oldCookie!=undefined){
						arr = JSON.parse(oldCookie);
						for(var i=0;i<arr.length;i++){
							if(d.num==arr[i].num){
								arr[i].count++
								flag = false;
								break;
							}
						}
					}
					if(flag){
						arr.push(d);
					}
					
					$.cookie("data",JSON.stringify(arr),{path:"/"})//存cookie	
					console.log($.cookie("data"))
						
						
					addNum1++;
					$(".nav-rLight").find("span").html(addNum1)
				})
			})
		}
	});
	//全球鲜果
	$.ajax({
		
		type:"get",
		url:"json/index.json",
		success:function(res){
			//页面加载获取数据
			var html = "";
			var globalFresh = res.globalFresh;
			for(var i in globalFresh){
				var	str = "";
				
				if(globalFresh[i].posSpan==""){
					str += `<span style="display:none">${globalFresh[i].posSpan}</span>`
				}else{
					str += `<span>${globalFresh[i].posSpan}</span>`
				}
				html += `
							<li>
								<a href=""><img src="img/${globalFresh[i].images}" alt="" /></a>
								<div class="s-fon">
									<div class="s-name">${globalFresh[i].sName}</div>
									<div class="s-unit">${globalFresh[i].sUnit}</div>
									<div class="s-che" style="${globalFresh[i].sChe}"></div>
								</div>
								<div class="pos-span">`
									+str+
								`</div>
							</li>
						`
			}
			$(".global-list").find("ul").html(html);
			
			//鼠标滑过 图片的动画
			$(".global-list").on("mouseenter","img",function(){
				$(this).css({
					"transform":"scale(1.1)",
					"transition":"0.3s"
				})
			}).on("mouseleave","img",function(){
				$(this).css({
					"transform":"scale(1)",
					"transition":"0.3s"
				})
			})
		}
	});
	//生鲜美食
	$.ajax({
		
		type:"get",
		url:"json/index.json",
		success:function(res){
			//页面加载获取数据
			var html = "";
			var freshFood = res.freshFood;
			for(var i in freshFood){
				var	str = "";
				
				if(freshFood[i].posSpan==""){
					str += `<span style="display:none">${freshFood[i].posSpan}</span>`
				}else{
					str += `<span>${freshFood[i].posSpan}</span>`
				}
				html += `
							<li>
								<a href=""><img src="img/${freshFood[i].images}" alt="" /></a>
								<div class="s-fon">
									<div class="s-name">${freshFood[i].sName}</div>
									<div class="s-unit">${freshFood[i].sUnit}</div>
									<div class="s-che" style="${freshFood[i].sChe}"></div>
								</div>
								<div class="pos-span">`
									+str+
								`</div>
							</li>
						`
			}
			$(".fresh-list").find("ul").html(html);
			
			//鼠标滑过 图片的动画
			$(".fresh-list").on("mouseenter","img",function(){
				$(this).css({
					"transform":"scale(1.1)",
					"transition":"0.3s"
				})
			}).on("mouseleave","img",function(){
				$(this).css({
					"transform":"scale(1)",
					"transition":"0.3s"
				})
			})
		}
	});
	//礼品卡券
	$.ajax({
		
		type:"get",
		url:"json/index.json",
		success:function(res){
			//页面加载获取数据
			/*console.log(res.giftCard[0].images)*/
			var html = "";
			var giftCards = res.giftCard;
			for(var i in giftCards){
				var	str = "";
				
				if(giftCards[i].posSpan==""){
					str += `<span style="display:none">${giftCards[i].posSpan}</span>`
				}else{
					str += `<span>${giftCards[i].posSpan}</span>`
				}
				html += `
							<li>
								<a href=""><img src="img/${giftCards[i].images}" alt="" /></a>
								<div class="s-fon">
									<div class="s-name">${giftCards[i].sName}</div>
									<div class="s-unit">${giftCards[i].sUnit}</div>
									<div class="s-che" style="${giftCards[i].sChe}"></div>
								</div>
								<div class="pos-span">`
									+str+
								`</div>
							</li>
						`
			}
			$(".gift-list").find("ul").html(html);
			
			//鼠标滑过 图片的动画
			$(".gift-list").on("mouseenter","img",function(){
				$(this).css({
					"transform":"scale(1.1)",
					"transition":"0.3s"
				})
			}).on("mouseleave","img",function(){
				$(this).css({
					"transform":"scale(1)",
					"transition":"0.3s"
				})
			})
		}
	});

})