var spreadJS = new Object();

spreadJS.init = function(unitCode){
	var spread = new GC.Spread.Sheets.Workbook(document.getElementById("ss"), {
		calcOnDemand : true,
		allowCopyPasteExcelStyle : false,	//	1 如何复制粘贴不带样式？（默认是带样式） allowCopyPasteExcelStyle = false 
		allowExtendPasteRange : true		//  2 从Excel 中选择了20行数据复制，粘贴时SpreadJS中只有10行，如何自动扩展行？allowExtendPasteRange = true;// 默认值是false
	});
	var spreadNS = GC.Spread.Sheets;
	var fbx = new spreadNS.FormulaTextBox.FormulaTextBox(document.getElementById('formulaBar'));
	var excelIo = new GC.Spread.Excel.IO();
	
	/**
	 * 	periodId：期间年度	string
		taskCode：任务编码	string
		bookLevel：任务级次	int
		inputBook：是否是录入表	boolean
		unitCode：单位代号，后期根据登录用户自动获取	string
		sheetCodes：sheet代号列表，格式为数组、null、空字符。传递则获取对应sheet数据，null或空字符获取所有数据
	 */
	
	
	
	
	
	var params = {
		'periodId' : 2019,
		'taskCode' : 'ZJS001FJNB',
		'bookLevel' : 0,
		'inputBook' : true,
		'unitCode' : unitCode,
	}
	spreadJS.initStruct(spread,params);			//初始化结构
	spreadJS.initLoad(spread,excelIo,params);	//初始化spread内容
	spreadJS.initController(spread,excelIo);	//初始化操作控件
	fbx.workbook(spread);
}


/**
 * 初始化数据结构
 */
spreadJS.initStruct = function(params){
	var struct = {
				'periodId' : 2019,
				'taskCode' : 'ZJS001FJNB',
				'bookLevel' : 0,
				'inputBook' : true,
				'unitCode' : '0090019101',
				"sheetDatas":[]};	//提交数据
	sessionStorage.setItem('struct',JSON.stringify(struct));					//保存回传结构
}

/**
 * 操作
 */
spreadJS.initController = function(spread,excelIo){
	spreadJS.undoRedo(spread);	//重做
	spreadJS.formulasShow();
	
    //导入excel文件
    $('#loadExcel').on('click',function(){
    	spreadJS.loadExcel(spread,excelIo);
    });
    //导出
    $('#saveExcel').on('click',function(){
    	spreadJS.saveExcel(spread,excelIo);
    });
    //导出pdf
    $('#savePDF').on('click',function(){
    	spreadJS.savePDF(spread);
    });
    //打印
    $('#btnPrint').on('click',function(){
    	spreadJS.print(spread);
    });
}

/**
 * 加载
 * 加载顺序
 * 模板-->单元格样式--->数据-->枚举--->公式
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
			el.start();
			spread.fromJSON(json);
			console.timeEnd("模板 timer");
			loadLine(81,100,'模板资源解析完成');
			
			spread.options.newTabVisible = false;	//禁用sheet新增 
			spread.options.tabEditable = false;		//禁用sheet编辑
			
			//sheet右键禁用
			for (var i = 0; i < spread.contextMenu.menuData.length; i++) {
				if (spread.contextMenu.menuData[i].workArea == "sheetTab") {
					delete spread.contextMenu.menuData[i];
				}
			}
			spreadJS.loadSheetInfo(spread,params);
        }, function (e) {
            Index.alert(e.errorMessage);
        }, {});
      }
    };
}

/**
 * 加载表页名称与代码关系列表
 */
spreadJS.loadSheetInfo = function(spread,params) {
	$.ajax({
		url : DATAHOST + '/execute/tsk/sheetInfo/getSheetNameAndCode',
		type : 'POST',
		data : params,
		success : function(data) {
			if (data.code == 0 && data.data != "") {
				sessionStorage.setItem('sheetCodes', JSON.stringify(data.data)); //表页名称与代码关系列表
				spreadJS.loadSheetData(spread,params);
			}
		}
	});
}

/**
 * 样式加载
 */
spreadJS.loadSheetFormat = function(spread,params){
	params.displayFormat = '';
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
        	// 设置 进度条到100%
        	loadLine(81,100,'样式资源解析完成');
        },
        success: function (data) {
        	if (data.code == 0 && data.data != "") {
        		// 设置 进度条到80%
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
				spreadJS.loadSheetEnum(spread,params);
			}
        	loadLine(51,80,'数据资源解析中');
        }
    });
}

/**
 * 加载枚举
 */
spreadJS.loadSheetEnum = function(spread,params){
	loadLine(0,1,'服务挂起');
	$.ajax({
        url: DATAHOST+'/execute/ind/eum/getEumIndicator',
        type: 'POST',
        data: params,
        beforeSend : function(){
            // 设置 进度条到20%慢慢变到50%
        	loadLine(19,50,'正在从服务器获取枚举资源');
        },
        complete: function(){
            // 设置 进度条到80%
        	loadLine(81,100,'枚举资源解析完成');
        },
        success: function (data) {
        	if (data.code == 0 && data.data != "") {
        		spreadJS.readJSON(spread, data.data);
        		spreadJS.loadSheetFormulas(spread, params);
			}
        	loadLine(51,80,'枚举资源解析中');
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
        		spreadJS.readJSON(spread, data.data);
        		sessionStorage.setItem('formulas',JSON.stringify(data.data));
        		getTextAre(params);
			}
        	loadLine(51,80,'公式资源解析中');
        }
    });
}

/**
 * 获取包含文本单元格的sheet 
 */
var getTextAre = function(params){
	params.displayFormat = '0';
	$.ajax({
        url: DATAHOST+'/execute/ind/tabulation/format',
        type: 'POST',
        data: params,
        success: function (data) {
        	if (data.code == 0 && data.data != "") {
        		sessionStorage.setItem('textAre',JSON.stringify(data.data));	//获取sheet包含文本单元格的数据
        		params.displayFormat = '';
        		alert('文本单元格已获取');
			}
        }
    });
}
/**
 * 读取json数据
 */
spreadJS.readJSON = function(spread,sheets) {
	var sheet;
	var isData;
	var cellFourmat;
	var cellFormulas;
	let indicatorList;
	var sheetCodes = JSON.parse(sessionStorage.getItem('sheetCodes'));
	spread.suspendPaint(); // suspendPaint 暂停重绘 先这样 很多操作之后 resumePaint
	console.time('整体加载完毕总用时');
	$.each(sheetCodes,function(a,b){
		$.each(sheets, function(i, v) {
			//根据当前sheets对象中的bookCode 获取对应表页名称
			if (b.code == v.bookCode || b.code ==v.vbookCode) {
				sheet = spread.getSheetFromName(b.name); // 获取第i个工作簿对象名称
				console.time(b.name + " timer");
				console.time(b.name + " 可编辑单元格");
				spreadJS.initSheet(sheet, v, isData); // 初始化表页
				console.timeEnd(b.name + " 可编辑单元格");
	
				// 调试发现:样式json中包含模板文件中不存在的sheet,发现跳过
				if (sheet != null) {
					cellFormat = v.cellFormat; // 单元格格式
					cellFormulas = v.cellFormulas //公式
					
					// 区分数据/样式数据
					if (cellFormat == undefined) { 
						sheet.suspendCalcService(false); // 关闭公式计算
						console.time(b.name + " 数据加载");
						spreadJS.initData(sheet, v);
						console.timeEnd(b.name + " 数据加载");
	
						console.time(b.name + " 公式恢复");
						sheet.resumeCalcService(true); // 开启公式计算
						console.timeEnd(b.name + " 公式恢复");
					} else {
						console.time(b.name + " 单元格格式");
						spreadJS.setDisplayFormat(sheet, cellFormat); // 单元格格式
						console.timeEnd(b.name + " 单元格格式");
	
						console.time(b.name + " 批注");
						spreadJS.addComments(sheet, cellFormat); // 批注
						console.timeEnd(b.name + " 批注");
					}
					
					//公式
					if (cellFormulas != undefined) {
						console.time(b.name + " 公式");
						spreadJS.initFormulas(sheet,cellFormulas);
						console.timeEnd(b.name + " 公式");
					}
				}
				console.timeEnd(b.name + " timer");
				return false;
			}
			enumBaseList = v.enumBaseList //枚举
			//枚举
			if (enumBaseList != undefined) {
				console.time(b.name + " 枚举加载");
				spreadJS.initEnum(sheet, v);
				console.timeEnd(b.name + " 枚举加载");
			}
		});
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
//	sheet.zoom(1.2);					//当前表单的缩放比
	
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
				sheet.getRange(parseInt(top[2])-1, top[1].charCodeAt()-65, parseInt(but[2])-1, but[1].length > 1 ? (((but[1].substring(0,1).charCodeAt()-65)+26)+(but[1].substring(1,2).charCodeAt()-65)) : but[1].charCodeAt()-65).locked(false);
			}else {
				// 单个单元参数
				let top = value[0].split('$'); // ["", "C", "5"]
				sheet.getCell(parseInt(top[2])-1, (top[1].charCodeAt()-65)).locked(false);
			}
		});
		
		//将sheetCodes中每个sheet追加参数dataCell
		var sheetCodes = JSON.parse(sessionStorage.getItem('sheetCodes'));
		var map = {};
		$.each(sheetCodes,function(k,v){
			if (v.name == data.bookName) {
				v['dataCell'] = dataCell;
				return false;	//找到就退出循环,节省资源
			}
		});
		sessionStorage.setItem('sheetCodes',JSON.stringify(sheetCodes));
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
		//公式单元格锁定
		sheet.getCell(y.row-1, y.col-1).locked(true);
	});
}

/**
 * 初始化枚举数据
 */
spreadJS.initEnum = function(sheet,data){
	var comboBox = new GC.Spread.Sheets.CellTypes.ComboBox();
	var array = [];
	$.each(data.enumBaseList,function(i,v){
		array.push(v.venumValue);
	});
	sheet.getCell(data.irow -1,data.icol - 1).cellType(comboBox.items(array));
}

/**
 * 数据汇总
 */
spreadJS.dataCollect = function(){
	var spread = GC.Spread.Sheets.findControl(document.getElementById('ss'));
	var activeRange ;	//当前区域
	var activeSheet ;	//当前sheet
	var sheetDatas;		//当前sheet中所有可编辑区域数据集合
	var sheet;			//当前sheet 对象,仅用于map数据拼接
	var struct = JSON.parse(sessionStorage.getItem('struct',struct));
	struct.sheetDatas = [];
	var nData;			//sheet行列单元格的值
	var cData;			//sheet行列单元格的值
	var dataCells = JSON.parse(sessionStorage.getItem('dataCells'));
	var datas;			//可编辑单元格区域值的集合
	var map;
	var row;
	var col;
	var sheetCodes = JSON.parse(sessionStorage.getItem('sheetCodes'));	//name 和 code 关联对象
	var textAre = JSON.parse(sessionStorage.getItem('textAre'));	//后台获取文本单元格对象
	
	// 遍历可编辑区域数组,根据bookName 获取sheet对象,将相对应的编辑区域值获取
	$.each(sheetCodes, function(a, b) {
		activeSheet = spread.getSheetFromName(b.name); // 根据名称获取sheet
		// 将datacell范围字符串解析
		sheet = {};
		sheetDatas = {};
		sheetDatas.cData = [];
		sheetDatas.nData = [];

		if (b.dataCell == undefined) //跳过没有dataCell字段的表 
			return true;
		$.each(b.dataCell.split(','), function(key, value) {
			nData = [];
			cData = [];
			if (value == "")
				return true;
			value = value.split(':'); // ["$C$5", "$C$710"]
			if (value.length > 1) {
				// 范围参数
				let top = value[0].split('$'); // ["", "C", "5"]
				let but = value[1].split('$'); // ["", "C", "710"]
				activeRange = activeSheet.getRange(parseInt(top[2])-1, top[1].charCodeAt()-65, parseInt(but[2])-1, but[1].length > 1 ? (((but[1].substring(0,1).charCodeAt()-65)+26)+(but[1].substring(1,2).charCodeAt()-65)) : but[1].charCodeAt()-65).locked(false);
			} else {
				// 单个单元参数
				let top = value[0].split('$'); // ["", "C", "5"]
				activeRange = activeSheet.getCell(parseInt(top[2]) - 1, (top[1].charCodeAt() - 65));
			}
			// 根据range提供的参数获取其区域内的全部数据
			datas = activeSheet.getArray(activeRange.row, activeRange.col,activeRange.rowCount, activeRange.colCount);
			
			// 将行列数据依次对应拼接
			row = activeRange.row;
			$.each(datas, function(i, v) {
				map = {};
				// 同一行
				row += 1;
				map['iRow'] = row;
				col = activeRange.col;
				
				// 此处v的值是此行中所有列值的数组,遍历分析具体数据类型
				$.each(v, function(x, y) {
					col += 1;
					
					if (y == "" || y == null)
						map['C' + col] = 1000;
					else{
						//过滤数值可编辑区中存在的中文
						if (!isNaN(y)) {
							map['C' + col] = y;
						}
					}
						

					if (col == activeRange.colCount + 1) {
						nData.push(map);
					}
				});
			});
			
			//获取文本单元格中的值
			$.each(textAre, function(i, v) {
				if (b.name == v.bookName) {
					$.each(v.cellFormat, function(x, y) {
							map = {};
							map['iRow'] = y.row;
							map['C' + y.col] = activeSheet.getValue(y.row -1 , y.col -1 )+"";
							cData.push(map);
					});
				}
			});
			
			dataCellMerge(sheetDatas.nData,nData);	//nData合并列
			dataCellMerge(sheetDatas.cData,cData);	//cData合并列
			
			var colNum;
			var flag;
			//将ndata存在与cdata中的行列值删除
			$.each(cData,function(i,v){
				//遍历cData 取出行中第一列的列值
				$.each(v,function(x,y){
					if (x.indexOf('C')>-1) {
						colNum = x.substring(1,2);
						return false;
					}
				});
				//遍历nData
				$.each(nData,function(x,y){
					//判断是否为同行
					if (y.iRow == v.iRow) {
						$.each(y,function(n,m){
							//判断是否为同一列,如果是,将判定当前map中存在与cData重复的值,并标记
							if (n.indexOf('C')>-1 && n.substring(1,2) == colNum) {
								flag = true;
								return false;
							}
						});
						//根据标记,删除重复列
						if (flag) {
							delete y['C'+colNum];
						}
					}
				});
			});
			
			// 将当前sheet中所有的区域数据整合
			if (sheetDatas.nData.length < 1) 
				sheetDatas.nData.push.apply(sheetDatas.nData, nData);
			if (sheetDatas.cData.length < 1)
				sheetDatas.cData.push.apply(sheetDatas.cData, cData);
		});

		// 将当前sheet表名称,数据拼成map存放strct中
		sheet['vBookCode'] = b.code;
		sheet['nData'] = sheetDatas.nData;
		sheet['cData'] = sheetDatas.cData;
		struct.sheetDatas.push(sheet);
	});
	//将处理好的Struct存储
	sessionStorage.setItem('struct',JSON.stringify(struct));
}

/**
 * 同行列合并
 */
var dataCellMerge = function(sourceArray,nowArray){
	//将同一sheet不同可编辑区域的数据整合,整合成为同一行,不同列
	$.each(sourceArray,function(i,v){
		$.each(nowArray,function(x,y){
			//将上一个可编辑区域中的irow 和 当前可编辑区域irow对比,相等:将当前可编辑区域中列的值放置在上一个集合中
			if (v.iRow == y.iRow) {
				$.each(y,function(n,m){
					if (n.indexOf('C')>-1) {
						v[n]=m;
						return false;
					}
				});
			}
		});
	});
}

/**
 * 清空spreadJS中的sheets
 */
spreadJS.distroy = function(){

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
	var text = $('#content > div > div.topRight > h3');
	for (var i = begin; i < end; i++) {
		obj.css('width',i+'%');
		text.text(tip);
	}
	if (end == 100) {
		obj.css('width','0%');
		text.text(tip);
	}
}