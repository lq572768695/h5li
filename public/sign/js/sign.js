$(function(){
	//周日历创建  待修改
	var $wrapper=$(".day_nav").find("ul")
	for(var n=1;n<31;n++){
		var $li=$('<li><div>'+n+'</div</li>')
		$wrapper.append($li)
	}
	$wrapper.children().eq(3).find("div").addClass("day_nav_active")

	
	/*周日历月日历切换*/
	$(".page_tc2,.load_date").click(function(){
		var status=$("#datepicker").attr("status")
		if(status=="0"){
			$("#datepicker").show().attr("status","1")
			$(".day_nav,.content_wrapper").hide()
		}else if(status=="1"){
			$("#datepicker").hide().attr("status","0")
			$(".day_nav,.content_wrapper").show()
		}		
	})	
	emic.loademic()
})

/*考勤统计*/
var emic={
	loademic:function(){
		$.ajax({
			url : "/sign/emic",
			type : "get",
			data : {
			},
			success : function(h){
				$("div.content_wrapper").html(h)
				emic.bindemic()
			}
		})
	},
	bindemic:function(){
		$(".load_infor").click(function(){
			var from=$(this).parents(".emic_name_num").find(".emic_n_na").html()
			detail.loaddetail(from)
		})
	}
}

/*考勤明细*/
var detail={
	loaddetail:function(from){
		$.ajax({
			url : "/sign/detail",
			type : "get",
			data : {
				from:from
			},
			success : function(h){
				$("div.content_wrapper").html(h)
				detail.binddetail()
			}
		})
	},
	binddetail:function(){
		$(".return_f").click(function(){
			emic.loademic()
		})
	}
}



