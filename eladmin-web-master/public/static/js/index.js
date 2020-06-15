var Yszx = new Object();

/**
 * 初始化树型结构思路
 * 1. 第一次初始化只加载部分节点例如:地方[省市],中央[本级,兵团]
 * 2. 当点击省市节点时,获取此节点的item_code,根据item_code加载对应的区,市
 * 3. 实时更新:
 * 	3.1 打算采用webSocket 实时获取更新状况
 */

Yszx.init = function(tree){
	if(!tree)
		tree=".tree";
	Yszx.initTree(tree);
}

/**
 * 初始化单位树
 */
Yszx.initTree = function(tree) {
	$.ajax({
		url : DATAHOST+'/execute/unt/unit/list',
		type : "GET",
		success : function(data){
			if (data.code == 0) {
				data=data.data;
				var s='<ul>';
				$.each(data,function(i,v){
					s+='<li><span unitCode="'+(v.c)+'" onclick><i class="fa fa-lg '+(v.ch ?'fa-folder-open':'')+
						'"></i> <label style="cursor:pointer" title="'+(v.c?v.c:v.n)+'" >'+
						v.n+
						'</label></span>';
					if(v.ch) {
						s+=Yszx.createSubTree(v.ch);
					}
					v+='</li>';
				});
				s+="</ul>";
				$(tree).html(s);
				Yszx.initDraw(tree);
			}else{
				alert('Exception :'+data.returnMessage);
			}
		}
	});
}

/**
 * 生成子集
 */
Yszx.createSubTree=function(data) {
	if(!data) return '';
	var s='<ul>';
	$.each(data,function(i,v){
		var icon='';
		icon='<i class="fa fa-file"  style="margin-left:5px;margin-right:5px"/>';
//		icon+='<input type="checkbox" name="checkbox-inline">';
//		'+(v.ch ? 'style="display:none"':'')+'
		s+='<li >'+
				'<span unitCode="'+(v.c)+'">'+
				'<i class="fa fa-lg '+(v.ch?'fa-folder-open':'')+'"></i>'+
				'<label style="cursor:pointer"> '+
					(v.ch?'':icon)+'&nbsp;'+v.n+
				'</label>'+
				'</span>';
		if(v.ch) {
			s+=Yszx.createSubTree(v.ch)
		}
		v+='</li>';
	});
	s+="</ul>";
	return s;
}

/**
 * 渲染单位树
 */
Yszx.initDraw = function(tree){
	$(tree+' > ul').attr('role', 'tree').find('ul').attr('role','group');
	$(tree).find('li:has(ul)').addClass('parent_li').attr('role', 'treeitem').find(' > span').attr('title','Collapse this branch').on('click',function(e) {
		var children = $(this).parent('li.parent_li').find(' > ul > li');
		if (children.is(':visible')) {
			children.hide('fast');
			$(this).attr('title', 'Expand this branch').find(' > i').removeClass().addClass('fa fa-lg fa-folder');
		} else {
			children.show('fast');
			$(this).attr('title', 'Collapse this branch').find(' > i').removeClass().addClass('fa fa-lg fa-folder-open');
		}
		e.stopPropagation();
	});
	
	var times = null;
	//某元素组织右键点击事件
	$(tree).find('li').find('span').bind("contextmenu", function(){
	    return false;
	});
	
	$(tree).find('li').find('span').on('dblclick',function () {
		// 取消上次延时未执行的方法
		clearTimeout(times);
		alert('双击');
	});
	
	$(tree).find('li').find('span').on('mousedown',function(e) {
	    console.log(e.which);
	    //右键为3
	    if (3 == e.which) {
	       alert('右击');
	    }
	    
	    //左键为1
	    var unitCode = $(this).attr('unitCode');
	    if (1 == e.which) {
	    	// 取消上次延时未执行的方法
			clearTimeout(times);
			//执行延时
			times = setTimeout(function(){
			//do function在此处写单击事件要执行的代码
				alert('左击');
				spreadJS.init(unitCode);
				$('#commitData').attr('unitCode',$(this).attr('unitCode'));
			},300);
	    }	
	});
}

Yszx.click = function(){
	spreadJS.init(unitCode);
	$('#commitData').attr('unitCode',unitCode);
}

Yszx.save = function(){
	spreadJS.dataCollect();
	alert('保存成功');
}
/**
 * 提交数据:暂未修改
 */
Yszx.commit = function(){
	var params = JSON.parse(sessionStorage.getItem('struct'));
	var sheetDatas = JSON.stringify(params.sheetDatas);
	if (sheetDatas.length == 0) {
		alert('请先点击保存 ,之后再点提交');
	}else{
		$.ajax({
			url : DATAHOST + '/execute/ind/tabulation/saveData',
			type : 'POST',
			data : {
				periodId: params.periodId,         	// 期间年度
				taskCode: params.taskCode,   		// 任务编码
				bookLevel:params.bookLevel,       	// 任务级次
				inputBook:params.inputBook,     	// 是否是录入表，boolean值
				unitCode:params.unitCode,  			// 单位代号
				sheetDatas:sheetDatas
			},
			success : function(data) {
				if (data.code == 0) {
					alert('提交成功');
				}else{
					alert('提交失败:'+data.msg);
				}
			}
		});
	}
}