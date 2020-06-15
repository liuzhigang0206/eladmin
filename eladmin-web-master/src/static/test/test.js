var spreadJS = new Object();
spreadJS.init = function(unitCode){
//	1 如何复制粘贴的时候不带样式？（默认是带样式） allowCopyPasteExcelStyle = false 
//  2 从Excel 中选择了20行数据复制，粘贴时SpreadJS中只有10行，如何自动扩展行？allowExtendPasteRange = true;// 默认值是false
	var spread =  new GC.Spread.Sheets.Workbook(document.getElementById("ss"), {calcOnDemand:true,allowCopyPasteExcelStyle:false,allowExtendPasteRange:true});
	var excelIo = new GC.Spread.Excel.IO();
	var params = {
		'periodId':2019,
		'taskCode':'ZJS001FJNB',
		'bookLevel':0,
		'inputBook':true,
		'unitCode': unitCode
	}
	spreadJS.initStruct();
	spreadJS.initLoad(spread,excelIo,params);
}

/**
 * 加载模板文件
 */
spreadJS.initLoad = function(spread,excelIo,params){
	loadLine(0,1,'服务挂起');
	var xhr =  new XMLHttpRequest();
    xhr.open('GET', DATAHOST+'/execute/ind/tabulation/templateFile?periodId=2019&taskCode=ZJS001FJNB&bookLevel=0&inputBook=true',true);
    xhr.responseType = 'blob';   
    loadLine(19,50,'正在从服务器获取模板资源');
    xhr.send();
    loadLine(51,80,'模板资源解析中');
    xhr.onload = function(e) {
      if (this.status == 200) {		
        var blob = this.response;
        excelIo.open(blob, function (json) {
			console.time("模板 timer");
			spread.fromJSON(json);
			console.timeEnd("模板 timer");
			loadLine(81,100,'模板资源解析完成');
			spreadJS.loadSheetFormat(spread,params);
			//下拉栏测试
			/*var cellType2 = new GC.Spread.Sheets.CellTypes.ComboBox();
			cellType2.items(["a","b","c"]);
			
			sheet = spread.getSheetFromName('IB');
			sheet.getCell(11, 2).cellType(cellType2);*/
        }, function (e) {
            alert(e.errorMessage);
        }, {});
      }
    };
}

/**
 * 样式加载
 */
spreadJS.loadSheetFormat = function(spread,params){
	loadLine(0,1,'服务挂起');
	$.ajax({
        url: DATAHOST+'/execute/ind/tabulation/format',
        type: 'POST',
        data: params,
        beforeSend : function(){
            // 设置 进度条到20%慢慢变到50%
        	loadLine(19,50,'正在从服务器获取样式资源');
        },
        complete: function(){
            // 设置 进度条到80%
        	loadLine(81,100,'样式资源解析完成');
        },
        success: function (data) {
        	if (data.code == 0 && data.data != "") {
        		// 设置 进度条到100%
				spreadJS.readJSON(spread,data.data);
				spreadJS.loadSheetData(spread,params);
			}
        	loadLine(51,80,'样式资源解析中');
        }
    });
}

/**
 * 数据加载
 */
spreadJS.loadSheetData = function(spread,params){
	loadLine(0,1,'服务挂起');
	$.ajax({
        url: DATAHOST+'/execute/ind/tabulation/data',
        type: 'POST',
        data: params,
        beforeSend : function(){
            // 设置 进度条到20%慢慢变到50%
        	loadLine(19,50,'正在从服务器获取数据资源');
        },
        complete: function(){
            // 设置 进度条到80%
        	loadLine(81,100,'数据资源解析完成');
        },
        success: function (data) {
        	if (data.code == 0 && data.data != "") {
				spreadJS.readJSON(spread, data.data);
				spreadJS.loadSheetFormulas(spread, params);
			}
        	loadLine(51,80,'数据资源解析中');
        }
    });
}

/**
 * 加载公式
 */
spreadJS.loadSheetFormulas = function(spread,params){
	loadLine(0,1,'服务挂起');
	$.ajax({
        url: DATAHOST+'/execute/ind/tabulation/formulas',
        type: 'POST',
        data: params,
        beforeSend : function(){
            // 设置 进度条到20%慢慢变到50%
        	loadLine(19,50,'正在从服务器获取公式资源');
        },
        complete: function(){
            // 设置 进度条到80%
        	loadLine(81,100,'公式资源解析完成');
        },
        success: function (data) {
        	if (data.code == 0 && data.data != "") {
        		sessionStorage.setItem('formulas',JSON.stringify(data.data));
			}
        	loadLine(51,80,'公式资源解析中');
        }
    });
}
/**
 * 读取json数据
 */
spreadJS.readJSON = function(spread,sheets) {
	var sheet;
	var isData;
	let indicatorList;
	spread.suspendPaint(); // suspendPaint 暂停重绘 先这样 很多操作之后 resumePaint
	console.time('整体加载完毕总用时');
	$.each(sheets, function(i, v) {
		sheet = spread.getSheetFromName(v.bookName); // 获取第i个工作簿对象名称
		console.time(v.bookName + " timer");
		console.time(v.bookName + " 可编辑单元格");
		spreadJS.initSheet(sheet, v, isData); // 初始化表页
		console.timeEnd(v.bookName + " 可编辑单元格");

		// 调试发现:样式json中包含模板文件中不存在的sheet,发现跳过
		if (sheet != null) {
			cellFormat = v.cellFormat; // 单元格格式
			cellFormulas = v.cellFormulas //公式

			if (cellFormat == undefined) { // 区分数据/样式数据
				sheet.suspendCalcService(false); // 关闭公式计算
				console.time(v.bookName + " 数据加载");
				spreadJS.initData(sheet, v);
				console.timeEnd(v.bookName + " 数据加载");

				console.time(v.bookName + " 公式恢复");
				sheet.resumeCalcService(true); // 开启公式计算
				console.timeEnd(v.bookName + " 公式恢复");
			} else {
				console.time(v.bookName + " 单元格格式");
				spreadJS.setDisplayFormat(sheet, cellFormat); // 单元格格式
				console.timeEnd(v.bookName + " 单元格格式");

				console.time(v.bookName + " 批注");
				spreadJS.addComments(sheet, cellFormat); // 批注
				console.timeEnd(v.bookName + " 批注");
			}
			
			if (cellFormulas != undefined) {
				console.time(v.bookName + " 公式");
				spreadJS.initFormulas(sheet,cellFormulas);
				console.timeEnd(v.bookName + " 公式");
			}
		}
		console.timeEnd(v.bookName + " timer");
	});
	console.timeEnd('整体加载完毕总用时');
	spread.resumePaint(); // 调用resumePaint 重新激活Spread重绘
}


/**
 * 初始化表单基本信息
 */
spreadJS.initSheet = function(sheet,data){
//	sheet.name(data.bookName);			//当前表单名称
//	sheet.setRowCount(data.maxRow);	//当前表单最大行数
//	sheet.setColumnCount(data.maxCol);	//当前表单最大列数
	sheet.zoom(1.7);					//当前表单的缩放比
	
	// 设置表单保护（表页全部只读）
	sheet.options.protectionOptions = protectionOptions;
	sheet.options.isProtected = true;
	/**
	 * 如果导入的模板中大部分单元格没有锁定，isProtected = true对没有锁定的单元格是无效的
	 * 如果想要锁定，建议将导入模板的单元格全部锁定
	 * 如果不能修改导入模板，可以使用代码sheet.getRange(0,0,sheet.getRowCount(),sheet.getColumnCount()).locked(true);来锁定所有的单元格，但这种锁定方式操作时间较久，不建议使用
	 */
	//sheet.getRange(0,0,sheet.getRowCount(),sheet.getColumnCount()).locked(true);
	
	// 开放可编辑单元格范围
	var dataCell = data.dataCell;	// 表页单元格可编辑范围（数据示例：$C$5:$C$710,$D$6:$L$33）
	//防止数据加载时,提示出错,因为数据json中不包含dataCell
	if (dataCell != undefined && dataCell!="") {
		$.each(dataCell.split(','), function(key, value) {
			if(value == "")
				return true;
			value = value.split(':');	// ["$C$5", "$C$710"]
			if(value.length > 1){
				// 范围参数
				let top = value[0].split('$'); // ["", "C", "5"]
				let but = value[1].split('$'); // ["", "C", "710"]
				sheet.getRange(parseInt(top[2])-1, top[1].charCodeAt()-65, parseInt(but[2])-1, but[1].charCodeAt()-65).locked(false);
			}else {
				// 单个单元参数
				let top = value[0].split('$'); // ["", "C", "5"]
				sheet.getCell(parseInt(top[2])-1, (top[1].charCodeAt()-65)).locked(false);
			}
		});
		
		//将当前sheet的可编辑范围存储[map,map]
		var dataCells = JSON.parse(sessionStorage.getItem('dataCells'));
		var map = {};
		map['bookName'] = data.bookName;
		map['dataCell'] = dataCell;
		dataCells.push(map);	
		sessionStorage.setItem('dataCells',JSON.stringify(dataCells));
	}
}

/**
 * 初始化表单数据
 */
spreadJS.initData = function(sheet,data){
	// 加载内容:cell 文本值
	$.each(data.cData, function(x, y) {
		$.each(y, function(key, value) {
			if('row' != key){
				sheet.setValue(y.row - 1, parseInt(key)-1, value);
			}
		});
	 });
	// 加载内容:cell 原始数值
	$.each(data.nData, function(x, y) {
		$.each(y, function(key, value) {
			if('row' != key){
				sheet.setValue(y.row - 1, parseInt(key)-1, value);
			}
		});
	 });
}

/**
 * 设置单元格格式（允许输入文本、货币、数值等格式数据）
 */
spreadJS.setDisplayFormat = function(sheet,indicatorList){
	$.each(indicatorList, function(x, y) {
		sheet.setFormatter(y.row-1, y.col-1, y.displayFormat); // 设置格式
	});
}
/**
 * 添加批注
 */
spreadJS.addComments = function(sheet,indicatorList){
	$.each(indicatorList, function(x, y) {
		sheet.comments.add(y.row-1, y.col-1, y.indicatorCode); // 将indicatorCode设置批注
	});
}

/**
 * 初始化表单公式
 */
spreadJS.initFormulas = function(sheet,formulas){
	//加载公式
	$.each(formulas,function(x,y){
		sheet.setFormula(y.row-1, y.col-1, y.formula);
	});
}

/**
 * 初始化提交数据结构
 */
spreadJS.initStruct = function(){
	var struct = {"sheetList":[]};
	var dataCells = [];
	sessionStorage.setItem('struct',JSON.stringify(struct));
	sessionStorage.setItem('dataCells',JSON.stringify(dataCells));
}

spreadJS.dataCollect = function(){
	var spread = GC.Spread.Sheets.findControl(document.getElementById('ss'));
	var activeRange ;	//当前区域
	var activeSheet ;	//当前sheet
	var sheetList = [];
	var sheet;
	var struct = JSON.parse(sessionStorage.getItem('struct',struct));
	var data = [];
	var dataCells = JSON.parse(sessionStorage.getItem('dataCells'));
	var datas;
	//遍历可编辑区域数组,根据bookName 获取sheet对象,将相对应的编辑区域值获取
	$.each(dataCells,function(a,b){
		activeSheet = spread.getSheetFromName(b.bookName);	//根据名称获取sheet
		//将datacell范围字符串解析
		$.each(b.dataCell.split(','),function(key, value) {
			sheet = {};
			if(value == "")
				return true;
			value = value.split(':');	// ["$C$5", "$C$710"]
			if(value.length > 1){
				// 范围参数
				let top = value[0].split('$'); // ["", "C", "5"]
				let but = value[1].split('$'); // ["", "C", "710"]
				activeRange = activeSheet.getRange(parseInt(top[2])-1, top[1].charCodeAt()-65, parseInt(but[2])-1, but[1].charCodeAt()-65);
			}else {
				// 单个单元参数
				let top = value[0].split('$'); // ["", "C", "5"]
				activeRange = activeSheet.getCell(parseInt(top[2])-1, (top[1].charCodeAt()-65));
			}
			//根据range提供的参数获取其区域内的全部数据
			datas = activeSheet.getArray(activeRange.row, activeRange.col, activeRange.rowCount, activeRange.colCount);
			//将行列数据依次对应拼接
			var row = activeRange.row;
			$.each(datas,function(i,v){
				var map = {};
				//同一行
				row += 1;
				map['r'] = row;
				var col = activeRange.col;
				//此处v的值是此行中所有列值的数组,遍历分析具体数据类型
				$.each(v,function(x,y){
					col += 1;
					map[col] = y;
					if (col == activeRange.colCount+1) {
						data.push(map);
					}
				});
				
				if (row == activeRange.rowCount+1) {
					sheet['b'] = b.bookName;
					sheet['d'] = data;
				}
			});
			
		});
		//数据拼装map,将map放置在struct中
		struct.sheetList.push(sheetList);
	});
	//将处理好的Struct存储
	sessionStorage.setItem('struct',JSON.stringify(struct));
}

/**
 * 清空spreadJS中的sheets
 */
spreadJS.distroy = function(){
	var spread = GC.Spread.Sheets.findControl(document.getElementById('ss'));
	if (spread != undefined) {
		spread.clearSheets();
	}
}

/**
 * 进度条加载
 */
spreadJS.ajax = function(url,type,data){
	$.ajax({
        url: url,
        type: 'POST',
        data: params,
        success: function (data) {
        	if (data.code == 0 && data.data != "") {
        		// 设置 进度条到100%
        		setTimeout(function(){
					spreadJS.readJSON(spread,data.data);
					spreadJS.loadSheetData(spread,params);
				},2000);
			}
        }
    });
}

var loadLine = function(begin,end,tip){
	var obj = $('#content > div > div.progress.progress-sm.progress-striped.active > div');
	var text = $('#content > div > div.topRight > h2');
	for (var i = begin; i < end; i++) {
		obj.css('width',i+'%');
		text.text(tip);
	}
	if (end == 100) {
		obj.css('width','0%');
		text.text(tip);
	}
}
