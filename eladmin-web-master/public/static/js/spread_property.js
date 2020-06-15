var FILEHOST = 'http://172.17.1.154:8880';
var DATAHOST = 'http://172.17.1.154:9990';
var DATAHOST_TEST = 'http://172.17.1.154:9999';

// 设置表单保护参数
var protectionOptions = {
	allowSelectLockedCells:true,	// 布尔值， 用户是否可以选中被锁定的单元格。
	allowSelectUnlockedCells:true,	// 布尔值, 用户是否可以选中未被锁定的单元格。
	allowFilter: false,	// 布尔值，用户是否可以对一片单元格区域进行筛选。
	allowSort: false,	// 布尔值，用户是否可以对一片单元格区域进行排序。
	allowResizeRows: false,	// 布尔值，用户是否可以改变行高。
	allowResizeColumns: false,	// 布尔值，用户是否可以改变列宽。
	allowEditObjects: false,	// 布尔值，用户是否可以编辑浮动元素。
	allowDragInsertRows: false,	// 布尔值，用户是否可以拖拽插入行。
	allowDragInsertColumns: false,	// 布尔值，用户是否可以拖拽插入列。
	allowInsertRows: false,	// 布尔值，用户是否可以插入行。
	allowInsertColumns: false,	// 布尔值，用户是否可以插入列。
	allowDeleteRows: false,	// 布尔值，用户是否可以删除行。
	allowDeleteColumns: false	// 布尔值，用户是否可以删除列。
};
