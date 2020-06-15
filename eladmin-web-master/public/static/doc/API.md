# API

### 获取Excel模板文件

```
GET /execute/ind/tabulation/templateFile
```

参数

```
periodId: '2019'         // 期间年度
taskCode: 'ZJS001FJNB'   // 任务编码
bookLevel: 0             // 任务级次
inputBook: true          // 是否是录入表，boolean值
```

返回

```
二进制文件
```

### 表页格式加载

```
POST /execute/ind/tabulation/format
```

参数

```
periodId: '2019'         // 期间年度
taskCode: 'ZJS001FJNB'   // 任务编码
bookLevel: 0             // 任务级次
inputBook: true          // 是否是录入表，boolean值
unitCode: '0090019101'   // 单位代号，后期根据登录用户自动获取
sheetCodes: ['001','002'] 或 '' 或 null   // sheet代号列表，null或空字符获取所有数据
displayFormat: 0         // 只获取文本类型单元格格式，传空返回全部
```

返回

```
{
  "code": 0,
  "msg": "成功",
  "data": 
    [{
      "bookName" : "sheet1",        // 表页名称
      "bookCode" : "001",           // 表页代号
      "dataCell" : "$D$6:$L$33",    // sheet页用户可编辑范围
      "decimalNum" : 2,             // 小数点位数，目前作用不大，暂不考虑
      "maxRow" : 27,                // 最大行
      "maxCol" : 3,                 // 最大列
      "cellFormat" :                // 单元格格式，目前需要考虑字段：row、col、displayFormat
        [{
          "row" : 2,               // 单元格所在行，从1开始
          "col" : 5,               // 单元格所在列，从1开始
          "indicatorName" : "L14表页码",                     // 指标名称
          "indicatorCode" : "_01_027_0028_0028_00269_004",  // 指标代号
          "displayFormat" : "General",  // 单元格格式，目前有以下几种设置格式：【#,##0】【#,##0.0】【#,##0.00】【#,##0;-#,##0】【0】【General】，带#建议设置为货币类型，而非数值类型
          "decimalNum" : 0,        // 暂不知作用，只有0和2两种值，暂不考虑
          "enumDispStyle" : -1,    // 枚举显示样式，只有-1和0两种值，暂不考虑
          "sumType" : -1           // 汇总方式，-1和0为非汇总，1为平均值，2为合计汇总，暂不考虑
        }]
    }]
}
```

### 表页数据加载

```
POST /execute/ind/tabulation/data
```

参数

```
periodId: '2019'         // 期间年度
taskCode: 'ZJS001FJNB'   // 任务编码
bookLevel: 0             // 任务级次
inputBook: true          // 是否是录入表，boolean值
unitCode: '0090019101'   // 单位代号，后期根据登录用户自动获取
sheetCodes: ['001','002'] 或 '' 或 null   // sheet代号列表，null或空字符获取所有数据
```

返回

```
{
  "code": 0,
  "msg": "成功",
  "data": 
    [{
      "bookCode": "001",  // 表页名称
      "bookName": "IB",   // 表页代号
      "dataCell" : "$D$6:$L$33",    // sheet页用户可编辑范围
      "maxRow" : 27,                // 最大行
      "maxCol": 4,        // 最大列
      "cData": [],        // 文本型数据
      "nData": []         // 原始数数据，decimal类型
    },{
      "bookCode": "002",
      "bookName": "ML",
      "dataCell" : "$D$6:$L$33",    // sheet页用户可编辑范围
      "maxRow" : 27,                // 最大行
      "maxCol": 6,
      "cData": [],
      "nData": 
        [{
          "row": 5,          // 数据所在行
          "4": 17000.0000,   // n代表数据所在列，从1开始，不同的sheet页n大小不同
          "5": 17000.0000,   // n代表数据所在列，从1开始，不同的sheet页n大小不同
        },{
          "row": 7,
          "4": 17000.0000
        }]
    }]
}
```

### 表页公式加载

```
POST /execute/ind/tabulation/formulas
```

参数

```
periodId: '2019'         // 期间年度
taskCode: 'ZJS001FJNB'   // 任务编码
bookLevel: 0             // 任务级次
inputBook: true          // 是否是录入表，boolean值
unitCode: '0090019101'   // 单位代号，后期根据登录用户自动获取
sheetCodes: ['001','002'] 或 '' 或 null   // sheet代号列表，null或空字符获取所有数据
```

返回

```
{
  "code": 0,
  "msg": "成功",
  "data": 
    [{
      "bookCode": "001",       // 表页代号
      "bookName": "IB",        // 表页名称
      "cellFormulas": []       // 单元格公式信息
    },{
      "bookCode": "002",       // 表页代号
      "bookName": "ML",        // 表页名称
      "cellFormulas": 
        [{
          "formulaId": 72,     // 公式ID
          "formulaType": 0,    // 0:计算 1：审核 2：收舍 3：期间取数 4：指标形的计算 5：指标形的审核 6：指标形的收舍 9：单元格的登统公式 10：指标形的登统公式 102：&DUnit() 103：&RPDate()
          "row": 5,            // 行号，从1开始
          "col": 4,            // 列号，从1开始
          "formula": "A36+1",  // 公式内容
          "formulaDescription": "",      // 公式注释
          "formulaTranslate": "A36+1",   // 解析后公式
          "scope": ""                    // 作用范围
        },{
          "formulaId": 9850,
          "formulaType": 5,
          "row": 5,
          "col": 3,
          "formula": "[_02_005_002(0)]=[_02_005_002(0,ZJSJB001FJNB)]",
          "formulaDescription": "应与简表数据一致，如不一致请在报表附注中说明出错原因及金额",
          "formulaTranslate": "@T_02_005_002[0]=@T_02_005_002[0,ZJSJB001FJNB]",
          "scope": ""
        }]
    }]
}
```

### 获取单位体系

```
GET /execute/unt/unit/list
```

参数

```
无
```

返回

```
c为单位编码；n为单位名称；ch为单位子集，子集为空时无ch参数

{
  "code": 0,
  "msg": "成功",
  "data": 
    [{
      "c" : "0",
      "n" : "全国合计",
      "ch": 
        [{
          "c" : "001",
          "n" : "中央本级",
          "ch": 
            [{
              "c" : "001001",
              "n" : "中央本级",
              "ch": [...]
            }]
        }]
    },{
      "c" : "009",
      "n" : "地方合计",
      "ch": [...]
    }]
}
```

### 数据汇总.直接下级汇总

```
POST /execute/ind/gather/general
```

参数

```
periodId: '2019'         // 期间年度
taskCode: 'ZJS001FJNB'   // 任务编码
bookLevel: 0             // 任务级次
inputBook: true          // 是否是录入表，boolean值
unitCode: '0090019101'   // 单位代号，后期根据登录用户自动获取
```

返回

```
{
  "code": 0,
  "msg": "成功",
  "data": null
}
```

### 获取任务的枚举列表信息

```
POST /execute/ind/eum/getEumIndicator
```

参数

```
periodId: '2019'         // 期间年度
taskCode: 'ZJS001FJNB'   // 任务编码
bookLevel: 0             // 任务级次
```

返回

```
{
  "code": 0,
  "msg": "成功",
  "data": 
    [{
      "vEnumGenCateCode": "ZJS001MJ",           // 枚举集编码 
      "vEnumCateCode": "013",                   // 枚举项编码
      "vBookCode": "001",                       // 表页编码
      "periodYear": "2019",             // 年度
      "vIndicatorVersion": "2019N",             // 指标版本?
      "vIndicatorCode": "_01_00120090101001",   // 指标编码
      "vIndicatorName": "省直管县信息",          // 指标名称
      "iEnumDispStyle": 0,                      // 枚举显示样式
      "iRow": 20,                               // 行，从1开始
      "iCol": 3,                                // 列，从1开始
      "enumBaseList":                           // 枚举值列表
        [{
          "vParentCode": null,    // 上级单位编码
          "vUnitCode": "",        // 单位编码
          "iLevel": 0,            // 级别
          "vEnumDispName": "是",  // 枚举显示名称？有部分数据为空字符
          "vEnumValue": "是",     // 枚举值
          "vEnumFullName": "是",  // 枚举全名
          "vEnumCode": "1",       // 枚举值编码
          "vSumFormula": ""       // 求和公式，目前数据库都为空字符
        },{
          "vParentCode": null,
          "vUnitCode": "",
          "iLevel": 0,
          "vEnumDispName": "否",
          "vEnumValue": "否",	
          "vEnumFullName": "否",
          "vEnumCode": "2",
          "vSumFormula": ""
        }]
    }]
}
```

### 获取表页名称与代码关系列表

```
POST /execute/tsk/sheetInfo/getSheetNameAndCode
```

参数

```
periodId: '2019'         // 期间年度
taskCode: 'ZJS001FJNB'   // 任务编码
bookLevel: 0             // 任务级次
inputBook: true          // 是否是录入表，boolean值
```

返回

```
{
  "code": 0,
  "msg": "成功",
  "data": [
    {
      "code": "001",
      "name": "IB"
    },{
      "code": "002",
      "name": "ML"
    }
  ]
}
```

### 保存表页数据

```
POST /execute/ind/tabulation/saveData
```

参数

```
periodId: '2019'         // 期间年度
taskCode: 'ZJS001FJNB'   // 任务编码
bookLevel: 0             // 任务级次
inputBook: true          // 是否是录入表，boolean值
unitCode: '0090019101'   // 单位代号
sheetDatas: 
  [{   
    vBookCode : "001"
    cData : 
      [{
        iRow : 3,
        C1 : "**信息",
        C2 : "**信息",
        C3 : "**信息"
      },{
        iRow : 4,
        C1 : "**信息",
        C2 : "**信息",
        C3 : "**信息"
      }]
    nData : [] //同cData格式
  },{
    // 同上
  }]
```

返回

```
{
  "code": 0,
  "msg": "成功",
  "data": null
}
```