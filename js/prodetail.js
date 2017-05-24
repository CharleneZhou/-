$(function(){	
	$.ajax({
		type:"get",
		url:"json/index.json",
		success:function(res){
			//果园推荐
			var html="";
			var str = "";
			var tuijian = res.fruitTuijian;
			
			var addrse = location.href;
//			console.log(res.fruitTuijian[0].name)
			num = addrse.split("?")[1].split("=")[1]
			for(var i in tuijian){
				if(tuijian[i].num==num){
					$("#bread").find(".huise").text(tuijian[i].name);
					$(".pname").find("h3").text(tuijian[i].name);
					$(".pname").find("p").text(tuijian[i].shuoming);
					$(".price01").find("span").last().text(tuijian[i].price);
					$(".guige").find("span").last().text(tuijian[i].guige);
					$(".chandi").find("span").text(tuijian[i].chandi);
					$(".beizhu").find("span").text(tuijian[i].beizhu);
					$(".goosComment").find(".chandi").text(tuijian[i].chandi);
					$(".goosComment").find(".tiandu").text(tuijian[i].tiandu);
					//焦点轮播图
					var listSmallImgs = tuijian[i].listSmallImg;
					var str = "";
					for(var j in listSmallImgs){
						str += `
								<li><img src="img/${listSmallImgs[j]}" alt="" /></li>
								`
					}
					
					$("#MyFocus").find(".small").html(str);
					$("#MyFocus").find(".big").html(str);
					//列表图
					var listQiyis = tuijian[i].listQiyi;
					var str2 = "";
					for(var k in listQiyis){
						str2 += `
									<img src="img/${listQiyis[k]}" alt="" />
								`
					}
					$(".goosComment").find(".imgs").html(str2);
				str =`
					<span style="display:none" data-num=${tuijian[i].num} data-images=${tuijian[i].images} data-price=${tuijian[i].price} data-name=${tuijian[i].name} data-guige=${tuijian[i].guige}></span>	
					`
				}
			$(".buy").append(str)
			}
			//
			
				$(".fr-add").click(function(){
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
						
					//取出cookie值添加到购物车弹出框
					data = JSON.parse( $.cookie("data") )
					var sCount = 0;
					var sPrice = 0;
					for (var a=0;a<data.length;a++) {
						sCount += data[a].count;
						sPrice +=parseFloat( data[a].price.split("￥")[1] );
					}
					$("#shop-cart").find(".count").html(sCount);
					$("#shop-cart").find(".price").html(sPrice);
//						console.log(sCount)
//						console.log(sPrice)
					$(".nav-rLight").find("span").html(sCount)	
						
					$(".nav-rLight").find("span").html(sCount)
					
					
					
					
				})
			
			$(".fr-buy").click(function(){
				window.location.href="http://127.0.0.1/Fruit-day/cart.html"
			})
			
		}
	});
	
	
	
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
	
	
	
	//<!--产品信息-->
	//二维码
	$(".price01").find(".box-right").hover(function(){
		$(".erweima").css("display","block");
	},function(){
		$(".erweima").css("display","none");
	})
	
	//配送地址选择
	$(".btn-group").find(".btn").mouseover(function(){
		$(".menu").css("display","block");
		$(".nav").find("li").first().addClass("activee");
	})
	//ajax获取jsons数据
	$.ajax({
		type:"get",
		url:"json/send-group.json",
		success:function(res){
			fn();
			function fn(){
				
				var provices = res.provice;
				var html = "";
				for(var i in provices){
					html +=`
							<li>${provices[i]}</li>
							`
				}
				$(".provice").find(".area-list").html(html)
			}
			//获取city值
			$(".provice").find(".area-list").children().each(function(){
				$(this).click(function(){
					//改变省份值
					$(".tab").find("em").first().text($(this).text())
					
					//获取当前选中的省的value值
					var indexs = $(this).index();
					var city_arr = res.city[indexs];
					var str = "";
					for ( var i = 0 ; i < city_arr.length ; i++ ) {
													//value值记录的是 省 和 对应的市所在数组中的下标
//													console.log(city_arr[i])
						str +=`
						<li>${city_arr[i]}</li>
						`
					}
					$(".city").find(".area-list").html(str);
					$(".nav").find("li").first().removeClass("activee");
					$(".nav").find("li").last().addClass("activee");
					//选择的城市到配送至去
					$(".city").find(".area-list").children().each(function(){
						$(this).click(function(){
							$(".btn-group").find(".addr").text($(this).text());
							$(".menu").css("display","none")
							
							
						})
						
					})
				})
			})
			
			//选择省
			$(".provice").find(".area-list").each(function(index,li){
				$(this).click(function(){
					$(this).parent().css({
						"display":"none"
					});
					$(".city").css("display","block")
				})
			})
		}
		
	});
	//数量减
	$(".redu").click(function(){
		var num = $(".goods-buy").find(".pull").val();
		num --;
		if(num<=1){
			num=1;
		}
		$(".goods-buy").find(".pull").val(num)
	})
	//数量加
	$(".add").click(function(){
		var num = $(".goods-buy").find(".pull").val();
		num ++;
		$(".goods-buy").find(".pull").val(num);
	})
	
	
	
	//点击关闭栏
	$(".close").click(function(){
		$(".menu").css("display","none");
	})
	
	
	//固定产品介绍栏
	var h = $("#content").height() + $("#hearder-content").height() + $("#hearder-wrap").height()+200 ;
	$(window).scroll(function(){
		var sTop =  $(document).scrollTop();
  		if( sTop>=h ){
  			$(".goodDetails").css({"position":"fixed","top":0})
  		}else{
  			$(".goodDetails").css({"position":""})
  		}
	})
	
	//清空导航栏样式
//	$(".nav-center").find("li").first().removeClass("current");
	$(".nav-center").find("li").removeClass("current");
//	console.log($(".nav-center").find("current").first())
	
})
