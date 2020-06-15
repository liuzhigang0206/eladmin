var spreadNS = GC.Spread.Sheets;

window.onload = function() {
	GC.Spread.Sheets.LicenseKey = '10.30.132.11,E974268733586292#B0RRK2iQ9oXNs36Uhh6cTd7ZMB7KrtiN9EHb4hGUIBneuF7TyRFMSZnUzAlaEBzRuRldz5WdPd4a9YmbpR4c4QEWuZWRyY5N0ZVdtV7d75WWLRDc7lTcCFWNzMFTGxUUndVZlRzSnBXY8EGZxZkWip5NXFXODFTTpJVYVl5NBp6V5F6bBZlMw9mN6ckRHhlNVtCNZV7bIlXZ8REaYt6NBtWMptieqR6d8oUMqV4Usl6UBJ4Q0ZzRJFlQ8c4V7tWVyM6RWRkQKF4Vl3WcPhTVzUzL0lEMMp5UqZFWWhkNn3ia73kdyZjW4IjYYh5L5AFOTVGZHVkbFlzViojITJCLiQ4NxUTRwMzMiojIIJCL9IDN5cTN9ATO0IicfJye35XX3JSVPNjNiojIDJCLiMTMuYHITpEIkFWZyB7UiojIOJyebpjIkJHUiwiI5QzNyEDMgkDM4ADMyAjMiojI4J7QiwiI9ATNwAjMwIjI0ICc8VkIsISMx8iMzEjLwMjLwEjI0IyctRkIsIyvde+vUaepVeujYauI0ISYONkIsUWdyRnOiwmdFJCLiITOyYDO5MzM7gjNyQzN9IiOiQWSiwSflNHbhZmOiI7ckJye0ICbuFkI1pjIEJCLi4TPBx6SYZDNvJkVwhGRGRkVUZGWVFlc4kWWzhkWLZDS8g7QDNkVGtSZCNHWyczYn3UY4p6dHNFO7o6LJVGNm9mQF3Gck5mSHh4ZyMzRtBFZhlWbiFmdaFGe9cWNV9wRw1';
	var spread = new GC.Spread.Sheets.Workbook(_getElementById('ss'), {
		sheetCount: 5
	});
	
	spread.options.newTabVisible = false; 
	spread.options.tabEditable = false;
	
	var a =  spread.contextMenu.menuData;
	for (var i = 0; i < a.length; i++) {
		if (a[i].workArea == "sheetTab") {
			delete a[i];
		}
	}
	//	spread.contextMenu.menuData.push({text: "删除", name: "designer.deleteSheet", command: "gc.spread.contextMenu.deleteSheet", workArea: "sheetTab"});
	
	initSpread(spread);
	spread.suspendPaint();
	setFilter(spread);
    spread.resumePaint();
};

function initSpread(spread) {
	var sheet = spread.getActiveSheet();

	spread.suspendPaint();
	var style = new GC.Spread.Sheets.Style();
	style.locked = false;
	style.backColor = 'lightGreen';

	var salesData = [
		[ 'SalesPers', 'Region' ],
		[ 'Joe', 'North' ],
		[ 'Robert', 'South' ],
		[ 'Michelle', 'East' ],
		[ 'Erich', 'West' ],
		[ 'Dafna', 'North' ],
		[ 'Rob', 'South' ],
		[ 'SalesPers', 'Region' ],
		[ 'Joe', 'North' ],
		[ 'Robert', 'South' ],
		[ 'Michelle', 'East' ],
		[ 'Erich', 'West' ],
		[ 'Dafna', 'North' ],
		[ 'Rob', 'South' ],
		[ 'SalesPers', 'Region' ],
		[ 'Joe', 'North' ],
		[ 'Robert', 'South' ],
		[ 'Michelle', 'East' ],
		[ 'Erich', 'West' ],
		[ 'Dafna', 'North' ],
		[ 'Rob', 'South' ]
	];

	sheet.setArray(0, 0, salesData);
	sheet.setStyle(1, 1, style);
	sheet.setStyle(1, 2, style);
	sheet.setStyle(5, 1, style);
	sheet.setStyle(5, 2, style);
	sheet.setStyle(8, -1, style);
	sheet.setStyle(9, -1, style);
	sheet.setStyle(12, -1, style);
	sheet.setStyle(13, -1, style);
	sheet.setStyle(-1, 8, style);
	sheet.setStyle(-1, 9, style);
	sheet.setStyle(-1, 12, style);
	sheet.setStyle(-1, 13, style);
	var filter = new GC.Spread.Sheets.Filter.HideRowFilter(new GC.Spread.Sheets.Range(0, 0, 100, 2));
	sheet.rowFilter(filter);

	sheet.comments.add(17, 0, 'locked');
	sheet.comments.add(17, 4, 'unlocked');
	sheet.comments.get(17, 0).locked(true).displayMode(1);
	sheet.comments.get(17, 4).locked(false).displayMode(1).lockText(false);

	spread.resumePaint();

	var option = {
		allowSelectLockedCells:true,
		allowSelectUnlockedCells:true,
		allowFilter: true,
		allowSort: false,
		allowResizeRows: true,
		allowResizeColumns: false,
		allowEditObjects: false,
		allowDragInsertRows: false,
		allowDragInsertColumns: false,
		allowInsertRows: false,
		allowInsertColumns: false,
		allowDeleteRows: false,
		allowDeleteColumns: false
	};
	sheet.options.protectionOptions = option;
	sheet.options.isProtected = true;

	option = sheet.options.protectionOptions;
	_getElementById('chkProtectSheet').checked = sheet.options.isProtected;
	_getElementById('chkSelectLockedCells').checked = option.allowSelectLockedCells;
	_getElementById('chkSelectUnlockedCells').checked = option.allowSelectUnlockedCells;
	_getElementById('chkAllowSort').checked = option.allowSort;
	_getElementById('chkAllowFilter').checked = option.allowFilter;
	_getElementById('chkAllowResizeRows').checked = option.allowResizeRows;
	_getElementById('chkAllowResizeColumns').checked = option.allowResizeColumns;
	_getElementById('chkAllowEditObjects').checked = option.allowEditObjects;
	_getElementById('chkAllowInsertRows').checked = option.allowInsertRows;
	_getElementById('chkAllowInsertColumns').checked = option.allowInsertColumns;
	_getElementById('chkAllowDeleteRows').checked = option.allowDeleteRows;
	_getElementById('chkAllowDeleteColumns').checked = option.allowDeleteColumns;

	_getElementById('chkProtectSheet').addEventListener('click', function() {
		var sheet = spread.getActiveSheet();
		var value = this.checked;
		sheet.options.isProtected = value;
	});

	_getElementById('setProtectionOptions').addEventListener('click', function() {
		var option = {
			allowSelectLockedCells: _getElementById('chkSelectLockedCells').checked,
			allowSelectUnlockedCells: _getElementById('chkSelectUnlockedCells').checked,
			allowSort: _getElementById('chkAllowSort').checked,
			allowFilter: _getElementById('chkAllowFilter').checked,
			allowResizeRows: _getElementById('chkAllowResizeRows').checked,
			allowResizeColumns: _getElementById('chkAllowResizeColumns').checked,
			allowEditObjects: _getElementById('chkAllowEditObjects').checked,
			allowInsertRows: _getElementById('chkAllowInsertRows').checked,
			allowInsertColumns: _getElementById('chkAllowInsertColumns').checked,
			allowDeleteRows: _getElementById('chkAllowDeleteRows').checked,
			allowDeleteColumns: _getElementById('chkAllowDeleteColumns').checked
		};
		var sheet = spread.getActiveSheet();
		sheet.options.protectionOptions = option;
	});
}

function _getElementById(id) {
	return document.getElementById(id);
}




function setFilter(spread) {
    var sheet = spread.getSheet(1);
    sheet.setArray(1, 1, [
        ["Number"],[1],[2],[3],[4],[5],[6],[7],[8]
    ])
    sheet.setColumnWidth(2, 120);
    sheet.setArray(1, 2, [
        ["Date"],['01/01/2017'],['02/01/2017'],['03/01/2017'],['04/01/2017'],['05/01/2017'],['06/01/2017'],['07/01/2017'],['08/01/2017']
    ])
    sheet.setArray(1, 3, [
        ["String"],["Abby"],["Aimee"],["Alisa"],["Angelia"],["Anne"],["Bobe"],["Jack"],["Grace"]
    ])
    var backColorArray = ['yellow','red','green','blue','orange','purple','pink','grey'];
    for(var i=0;i<backColorArray.length;i++){
        sheet.getCell(2+i,4).backColor(backColorArray[i]);
    }


    _getElementById("Condition1").addEventListener('change',function () {
        var condition = _getElementById("Condition1").value;
        var type = _getElementById("optEnumType1");
        setEnumType(condition, type);
    });
    _getElementById("Condition2").addEventListener('change',function () {
        var condition = _getElementById("Condition2").value;
        var type = _getElementById("optEnumType2");
        setEnumType(condition, type);
    });

    function setEnumType(condition, type) {
        var data=[];
        switch (condition) {
            case "0":
                data = ['等于','不等于','大于','大于等于','小于','小于等于'];
                _appendChild(type,data);
                break;
            case "1":
                data = ['等于','不等于','大于','大于等于','小于','小于等于'];
                _appendChild(type,data);
                break;
            case "2":
                data = ['等于','不等于','开始','不开始','结束','不结束','包含','不包含'];
                _appendChild(type,data);
                break;
            case "3":
                data = ["背景颜色","前景颜色"];
                _appendChild(type,data);
                break;
            case "4":
                data = ["空","非空","错误","非错误","公式"];
                _appendChild(type,data);
                break;
            case "5":
                data = ['等于','不等于','之前','之前等于','之后','之后等于'];
                _appendChild(type,data);
                break;
            case "6":
                data = ['今天','昨天','明天','最近7天','本月','上月','下月','本周','上周','下周','从今天','从本月','从本季度','从本周','从本年'];
                _appendChild(type,data);
                break;
            case "7":
                data = ['等于','不等于','大于','大于等于','小于','小于等于'];
                _appendChild(type,data);
                break;
            case "8":
                data = ['置顶','置尾'];
                _appendChild(type,data);AC
                break;
            default:
                data = ['等于','不等于','大于','大于等于','小于','小于等于'];
                _appendChild(type,data);
                break;
        }
    }
    function getConditionBase(condition, type, value) {
        var sheet = spread.getActiveSheet();
        var condtionbase;
        var formula;
        if ((value != null) && (value[0] == "=")) {
            formula = value;
            value = null;
        }
        else {
            formula = null;
            if (!isNaN(value)) {
                value = parseFloat(value);
            }
        }
        switch (condition) {
            case "0":
                condtionbase = new spreadNS.ConditionalFormatting.Condition(spreadNS.ConditionalFormatting.ConditionType.cellValueCondition, {
                    compareType: type,
                    expected: value,
                    formula: formula
                });
                break;
            case "1":
                condtionbase = new spreadNS.ConditionalFormatting.Condition(spreadNS.ConditionalFormatting.ConditionType.numberCondition, {
                    compareType: type,
                    expected: value,
                    formula: formula
                });
                break;
            case "2":
                condtionbase = new spreadNS.ConditionalFormatting.Condition(spreadNS.ConditionalFormatting.ConditionType.textCondition, {
                    compareType: type,
                    expected: value,
                    formula: formula
                });
                break;
            case "3":
                condtionbase = new spreadNS.ConditionalFormatting.Condition(spreadNS.ConditionalFormatting.ConditionType.colorCondition, {
                    compareType: type,
                    expected: value
                });
                break;
            case "4":
                condtionbase = new spreadNS.ConditionalFormatting.Condition(spreadNS.ConditionalFormatting.ConditionType.formulaCondition, {
                    customValueType: type,
                    formula: formula
                });
                break;
            case "5":
                condtionbase = new spreadNS.ConditionalFormatting.Condition(spreadNS.ConditionalFormatting.ConditionType.dateCondition, {
                    compareType: type,
                    expected: value,
                    formula: formula
                });
                break;
            case "6":
                if (type < 10) {
                    condtionbase = new spreadNS.ConditionalFormatting.Condition(spreadNS.ConditionalFormatting.ConditionType.dateExCondition, {
                        expected: type,
                    });
                }
                else if (type == 10) {
                    condtionbase = spreadNS.ConditionalFormatting.Condition.fromDay(value);
                } else if (type == 11) {
                    condtionbase = spreadNS.ConditionalFormatting.Condition.fromMonth(value);
                } else if (type == 12) {
                    condtionbase = spreadNS.ConditionalFormatting.Condition.fromQuarter(value);
                } else if (type == 13) {
                    condtionbase = spreadNS.ConditionalFormatting.Condition.fromWeek(value);
                } else {
                    condtionbase = spreadNS.ConditionalFormatting.Condition.fromYear(value);
                }
                break;
            case "7":
                condtionbase = new spreadNS.ConditionalFormatting.Condition(spreadNS.ConditionalFormatting.ConditionType.textLengthCondition, {
                    compareType: type,
                    expected: value,
                    formula: formula
                });
                break;
            case "8":
                var ranges = sheet.getSelections().slice(0);
                condtionbase = new spreadNS.ConditionalFormatting.Condition(spreadNS.ConditionalFormatting.ConditionType.top10Condition, {
                    type: type,
                    expected: value,
                    ranges: ranges
                });
                break;
            default:
                condtionbase = new spreadNS.ConditionalFormatting.Condition(spreadNS.ConditionalFormatting.ConditionType.cellValueCondition, {
                    compareType: type,
                    expected: value,
                    formula: formula
                });
                break;
        }
        return condtionbase;

    }

    function getConditions() {
        var radio1 = _getElementById("rdoAND").checked;
        var radio2 = _getElementById("rdoOR").checked;

        var condition1 = _getElementById("Condition1").value;
        var condition2 = _getElementById("Condition2").value;
        var type1 = parseInt(_getElementById("optEnumType1").value);
        var type2 = parseInt(_getElementById("optEnumType2").value);
        var value1 = _getElementById("txtFormulas1").value;
        var value2 = _getElementById("txtFormulas2").value;
        var con1 = getConditionBase(condition1, type1, value1);
        var con2 = getConditionBase(condition2, type2, value2);
        var conditions;
        if (value2 != null || value2 != "" || value2 != undefined) {
            if (radio1) {
                conditions = new spreadNS.ConditionalFormatting.Condition(spreadNS.ConditionalFormatting.ConditionType.relationCondition, {
                    compareType: spreadNS.ConditionalFormatting.LogicalOperators.and,
                    item1: con1,
                    item2: con2
                });
            }
            else if (radio2) {
                conditions = new spreadNS.ConditionalFormatting.Condition(spreadNS.ConditionalFormatting.ConditionType.relationCondition, {
                    compareType: spreadNS.ConditionalFormatting.LogicalOperators.or,
                    item1: con1,
                    item2: con2
                });
            }
            else {
                conditions = con1;
            }
        }
        else {
            conditions = con1;
        }

        return conditions;

    }
    _getElementById("btnHideRowFilter").addEventListener('click',function () {
        var sheet = spread.getActiveSheet();
        var sels = sheet.getSelections();
        if (sels.length == 0) return;
        var sel = sels[0];
        // set filter
        var _drf = new spreadNS.Filter.HideRowFilter(sel);
        sheet.rowFilter(_drf);
        var nc = getConditions();
        nc.ignoreBlank(_getElementById('chkIgnoreBlank').checked);
        _drf.addFilterItem(sheet.getActiveColumnIndex(), nc);

        // filter
        _drf.filter((sel.col >= 0) ? sel.col : 0);
        sheet.invalidateLayout();
        sheet.repaint();
    });

    _getElementById("btnClearFilter").addEventListener('click',function () {
        var sheet = spread.getActiveSheet();
        sheet.rowFilter(null);
        sheet.invalidateLayout();
        sheet.repaint();
    });
}

function _appendChild(type,data){
    type.innerHTML='';
    for(var i=0;i<data.length;i++){
        var option = document.createElement('option');
        var value = document.createAttribute('value');
        value.nodeValue = i;
        option.setAttributeNode(value);
        option.innerHTML = data[i];
        type.appendChild(option);
    }
 }
