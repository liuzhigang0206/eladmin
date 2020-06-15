/**
 * 重做撤销:
 * 	暂不支持同步数据
 */
spreadJS.undoRedo = function(spread){
	$("#undo").click(function () {
        if(spread.undoManager().canUndo()){
            spread.undoManager().undo();
        }
    });

    $("#redo").click(function () {
        if(spread.undoManager().canRedo()){
            spread.undoManager().redo();
        }
    });
}


/**
 * 保存为pdf
 * SpreadJS PDF导出内置14种标准字体。

	Courier: Courier, Courier-Bold, Courier-Oblique, Courier-BoldOblique
	
	Times: Tomes-Roman, Times-Bold, Times-Italic, Times-BoldItalic
	
	Helvetica: Helvetica, Helvetica-Bold, Helvetica-Oblique, Helvetica-BoldOblique
	
	Symbol: Symbol
	
	ZapfDingbats: ZapfDingbats
	
	参数:
	options.creator: 应用的名称 (例如：Adobe FrameMaker®) 创建了被转换的原始文档。

	options.title: 文档的标题。
	
	options.author: 文档的作者。
	
	options.keywords: 与文档关联的关键字。
	
	options.subject: 文档的主题
	
	sheetIndex: 导出具体工作表的索引，如果不设置，所有可见的工作表都会被导出。
 */
spreadJS.savePDF = function(spread){
	var sheet = spread.getActiveSheet();
	spread.savePDF(
            function (blob) {
                saveAs(blob, 'download.pdf');
            },
            console.log,
            {
                title: 'xxxxx',
                author: 'wwwww',
                sheetIndex : '1'
            });
	var sd = data;
    if (sd && sd.sheets) {
        if (!spread) {
            return;
        }
        spread.suspendPaint();
        spread.fromJSON(sd);

        sheet.suspendPaint();
        spreadJS.printInfo(spread,sheet);
        
        sheet.resumePaint();
        spread.resumePaint();
    }
}

/**
 * 打印
 */
spreadJS.print = function(spread){
    var printInfo = new GC.Spread.Sheets.Print.PrintInfo();
    var sheet = spread.getActiveSheet();
    
    spreadJS.printInfo(printInfo,sheet);

    sheet.printInfo(printInfo);
    spread.print(spread.getActiveSheetIndex());
}

/**
 * 事件监听
 */
spreadJS.bind = function(spread,spreadNS){
	//监听编辑结束
//	spread.bind(spreadNS.Events.EditEnded, function (e, args) {
//		var struct = JSON.parse(sessionStorage.getItem('struct',struct));
//		var sheet = spread.getActiveSheet();
//		spreadJS.collectData(struct,sheet,args);
//    });
}

/**
 * 单元格公式展示
 */
spreadJS.formulasShow = function(){
	var spread = GC.Spread.Sheets.findControl(document.getElementById('ss'));
	spread.suspendEvent();
	
	//切换sheet
    spread.bind(GC.Spread.Sheets.Events.ActiveSheetChanged, function(e,args) {
    	console.info('change sheet');
    	var activeSheet = spread.getActiveSheet();
    	activeSheet.options.clipBoardOptions = GC.Spread.Sheets.ClipboardPasteOptions.values;	//spread 内部复制值
    	//右侧公式信息展示:选中事件
    	activeSheet.bind(GC.Spread.Sheets.Events.SelectionChanged, function (e, info) {    
            var formulas = JSON.parse(sessionStorage.getItem('formulas'));
            var sheetName = info.sheetName;
            var row = info.newSelections[0].row + 1;
            var col = info.newSelections[0].col + 1;
            
            var obj = {};
            $.each(formulas,function(x,y){
            	if (y.bookName == sheetName) {
					$.each(y.cellFormulas,function(k,v){
						if (v.row == row && v.col == col) {
							obj['formula'] = v.formula;
							obj['formulaDescription'] = v.formulaDescription
							obj['formulaTranslate'] = v.formulaTranslate;
							obj['formulaType'] = v.formulaType;
							obj['scope'] = v.scope;
							return false;		//找到后终止循环
						}
					});
				}
            });
            
            if (Object.keys(obj).length > 0) {
				$('#formula').val(obj.formula);
				$('#formulaDescription').val(obj.formulaDescription);
				$('#formulaTranslate').val(obj.formulaTranslate);
				$('#formulaType option[value='+obj.formulaType+']').attr("selected",true);
				$('#scope').val(obj[scope]);
			}
    	});
    	
    });
    spread.resumeEvent();
}

/**
 * 导入
 */
spreadJS.loadExcel = function(spread,excelIo){
	var excelFile = document.getElementById("fileDemo").files[0];
    var password = document.getElementById('password').value;
    // here is excel IO API
    excelIo.open(excelFile, function (json) {
        var workbookObj = json;
        console.info("load"+json);
        spread.fromJSON(workbookObj);
    }, function (e) {
        alert(e.errorMessage);
        if (e.errorCode === 2/*noPassword*/ || e.errorCode === 3 /*invalidPassword*/) {
            document.getElementById('password').onselect = null;
        }
    }, {password: password});
}

/**
 * 导出
 */
spreadJS.saveExcel = function(spread,excelIo){
	 var fileName = document.getElementById('exportFileName').value;
     var password = document.getElementById('password').value;
     if (fileName.substr(-5, 5) !== '.xlsx') {
         fileName += '.xlsx';
     }
     var json = spread.toJSON();
     console.info("save"+JSON.stringify(json));
     excelIo.save(json, function (blob) {
         saveAs(blob, fileName);
     }, function (e) {
         console.log(e);
     }, {password: password});
}


spreadJS.printInfo = function(printInfo,sheet) {
//	printInfo.bestFitColumns(false); //整列宽以适合最长的打印文本宽度
//	printInfo.bestFitRows(false); //整行高以适合要打印的最高文本高度
//
//	printInfo.centering(GC.Spread.Sheets.Print.PrintCentering.both); //居中打印
//
//	printInfo.columnStart(1); //获取或设置打印单元格区域时要打印的第一列
//	printInfo.columnEnd(); //获取或设置打印单元格区域时要打印的最后一列    
//	printInfo.rowStart(0);
//	printInfo
//			.rowEnd((sheet.getRowCount(GC.Spread.Sheets.SheetArea.viewport) - 1));
//
//	//行号列号隐藏
//	printInfo.showColumnHeader(GC.Spread.Sheets.Print.PrintVisibilityType.hide);
//	printInfo.showRowHeader(GC.Spread.Sheets.Print.PrintVisibilityType.hide);
//	//设置打印边距
//	printInfo.headerLeft('It is &T.');
//	printInfo.headerCenter("&SThis is text.");
//	printInfo.headerRight('&BHeader');
//	printInfo.footerLeft('&BFooter');
//	printInfo.footerCenter('&SThis is text.');
//	printInfo.footerRight('&G');
//	printInfo.margin({
//		top : 0.5,
//		bottom : 0.5,
//		left : 0.5,
//		right : 0.5,
//		header : 0,
//		footer : 0
//	});
//
//	//纸张设置 a4
//	printInfo.paperSize(new GC.Spread.Sheets.Print.PaperSize(
//			GC.Spread.Sheets.Print.PaperKind.a4));
//
//	//页面方向
//	printInfo
//			.orientation(GC.Spread.Sheets.Print.PrintPageOrientation.landscape); //portrait为纵向
//
//	//打印缩放
//	printInfo.zoomFactor(0.75);
//
//	//仅打印包含数据的行和列
//	printInfo.useMax(true);
	
	
	// custom printInfo for default output
//  printInfo.showBorder(false);
//  printInfo.showGridLine(false);
//  printInfo.columnEnd((sheet.getColumnCount(GC.Spread.Sheets.SheetArea.viewport) - 1));
//  printInfo.showColumnHeader(GC.Spread.Sheets.Print.PrintVisibilityType.inherit);
//  printInfo.showRowHeader(GC.Spread.Sheets.Print.PrintVisibilityType.inherit);
}

function addFontsToFontManager(fontsObj) {
    var fonts = {
        normal: fontsObj["simkai.ttf"]
    };
    GC.Spread.Sheets.PDF.PDFFontsManager.fallbackFont = function (font) {
        var fontInfoArray = font.split(' ');
        var fontName = fontInfoArray[fontInfoArray.length - 1];
        if (fontName === 'mtcorsva') {
            return fonts.normal;
        }
    }
}

function registerServerFont(name, type, serverPath) {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', serverPath, true);
    xhr.responseType = 'blob';

    xhr.onload = function (e) {
        if (this.status == 200) {
            // get binary data as a response
            var blob = this.response;

            //将Blob 对象转换成 ArrayBuffer
            var reader = new FileReader();
            reader.onload = function (e) {
                var fontrrayBuffer = reader.result;
                var fonts = GC.Spread.Sheets.PDF.PDFFontsManager.getFont(name) || {};
                fonts[type] = fontrrayBuffer;
                GC.Spread.Sheets.PDF.PDFFontsManager.registerFont(name, fonts);
            }
            reader.readAsArrayBuffer(blob);
        }
    };

    xhr.send();
}