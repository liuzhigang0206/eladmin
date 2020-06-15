
/**
 * 事件记录 各个事件主体信息: xxx事件,执行xxx动作,耗时xxxms
 */
var el = new Object();

/**
 * 记录存储结构
 */
el.struct = {'events':[{'evevtName':'test','eventActive':'test','time':'test'}]};

/**
 * 常量
 */
el.TIME = '';

/**
 * 事件开始
 */
el.start = function(eventName,eventActive){
	el.TIME = new Date();
}

/**
 * 事件结束
 */
el.end = function(eventName,eventActive,startTime){
   	var map = {};
   	map['eventName'] = eventName;
   	map['eventActive'] = eventActive;
   	map['time'] = parseInt(((new Date() - el.TIME)/1000)%60*1000);
   	el.struct.events.push(map);
}