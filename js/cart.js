$(function(){			
			
	//获取cookie
	var shoplists = JSON.parse($.cookie("data"));			
	var html = "";
		for(var i = 0 ;i<shoplists.length;i++){
			
			html += `
					<li>
						<div class="imgs pulls">
							<a href="#"><img src="img/${shoplists[i].images}"/></a>
						</div>
						<div class="name pulls">
							<p><a href="#">${shoplists[i].name}</a></p>
						</div>
						<div class="spec pulls">
							<p>${shoplists[i].guige}</p>
						</div>
						<div class="price pulls">
							<p>${shoplists[i].price}</p>
						</div>
						<div class="num pulls" data-num=${shoplists[i].num} data-images=${shoplists[i].images} data-price=${shoplists[i].price} data-name=${shoplists[i].name} data-count=${shoplists[i].count}>
							
								<span class="jian updateCount">-</span>
								<input type="tel" class="qty" name="" id="" value="${shoplists[i].count}" disabled/>
								<span class="add updateCount">+</span>
							
						</div>
						<div class="sum pulls">
							<p>￥${shoplists[i].price.split("￥")[1]*shoplists[i].count}</p>
						</div>
						<div class="delet pulls">
							<p class="deletAll">删除</p>
						</div>
					</li>
			
					`
		}
	
	
	$(".list").find("ul").html(html)
	
	
	
	
	//加减操作
	$(".updateCount").click(function(){
		
		var num = $(this).parent().data("num");
		var flag = $(this).html();
		var count = $(this).parent().parent().find(".qty").val();
		if(count==1 && flag == "-"){
			return ;
		}
		for(var i=0;i<shoplists.length;i++){
			if(num == shoplists[i].num){
				flag == "+" ? shoplists[i].count++ : shoplists[i].count--;
				//修改cookie信息
				$.cookie("data",JSON.stringify(shoplists),{path:"/"});
				//修改界面信息
				$(this).parent().parent().find(".qty").val( shoplists[i].count );
	$(this).parent().parent().find(".sum").children(0).html("￥"+shoplists[i].price.split("￥")[1]*shoplists[i].count );
			}
		}
		
		jiesuan()

	})
		
		
	jiesuan()	
	//结算功能
	function jiesuan(){
		
		var sumCount = 0;
		var sumPrice = 0;
		$(".list").find("li").each(function(){
//			console.log( $(this).find( $(".sum p") ).html().split("￥") )
//			alert(this.tagName)
			sumCount += parseInt($(this).find($(".qty")).val());			
			sumPrice += parseFloat( $(this).find( $(".sum p") ).html().split("￥")[1] );
			
//			alert(sumPrice)
		})
		//alert( sumPrice )
		$(".cartFooter").find("em").html(sumCount);
		$(".totle").html("￥"+sumPrice);
	}
	
	
	//删除
	$(".delet").click(function(){
		var num = $(this).parent().find(".num").data("num");
		if(confirm("你确定要删除吗")){
			for(var i=0;i<shoplists.length;i++){
				if(num == shoplists[i].num){
					shoplists.splice(i,1);
					$.cookie("data",JSON.stringify(shoplists),{path:"/"})
					break;
				}
			}
			$(this).parent().remove();
		}
	})
		
	
	
})