$(function(){
	$.ajax({
		type:"get",
		url:"json/index.json",
		success:function(res){
			//页面加载获取数据
			var html = "";
			var tuijian = res.fruitTuijian;
			for(var j=0;j<4;j++){
				for(var i in tuijian){
					var	str = "";
					if(tuijian[i].posSpan==""){
						
						
						str += `<span style="display:none">${tuijian[i].posSpan}</span>`
					}else{
						str += `<span>${tuijian[i].posSpan}</span>`
					}
					html += `
								<li>
								<div class="wrap">
									<div class="imgs">
										<a href="#"><img src="img/${tuijian[i].images}"/></a>
									</div>
									<div class="info">
										<p>${tuijian[i].name}</p><span>${tuijian[i].price}</span>
									</div>
									<div class="p-operate">
										<div class="guige">${tuijian[i].guige}</div>
										<div class="s-che"></div>
										<span style="display:none" data-num=${tuijian[i].num} data-images=${tuijian[i].images} data-price=${tuijian[i].price} data-name=${tuijian[i].name} data-guige=${tuijian[i].guige}></span>
									</div>
								</div>
							</li>
							`
				}
			}
			$(".listLeft").find("ul").html(html);
			//鼠标滑过 图片的动画
			
			
			
			$(".listLeft").on("mouseenter","li",function(){
				$(this).css({
					"transform":"scale(1.1)",
					"transition":"0.9s",
					"box-shadow":"1px 1px 50px #ccc",
					"z-index":"2"
					
				})
			}).on("mouseleave","li",function(){
				$(this).css({
					"transform":"scale(1)",
					"transition":"0.9s",
					"box-shadow":"0px 0px 0px #fff",
					"z-index":0
				})
			})
			
			
			$(".listLeft").find(".s-che").each(function(index){
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
	
	
	
	//导航栏样式
	$(".nav-center").find("li").each(function(){
		$(this).one("click",function(){
			$(this).addClass("current").siblings().removeClass("current");
		})
	})
	$(".nav-center").find("li").first().removeClass("current");
	$(".nav-center").find("li").eq(1).addClass("current");
	
	
	
})
