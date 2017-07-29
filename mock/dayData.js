var config=require('../config.js')
var groupArray = require('group-array');
var HourModel=require('../models/hourDataModel.js')
require('../utils/Array.js')
require('../utils/Date.js')

function getGroupSum(array,cityId,referType,deviceType){
	return new HourModel(array._first()._site_id, array._first()._report_time, 
        array._sum(function (p) { return p._visit; }),
        array._sum(function (p) { return p._pv; }),
        array._sum(function (p) { return p._bounce; }),
        array._sum(function (p) { return p._uv; }),
        array._sum(function (p) { return p._new_visitor; }),
        array._sum(function (p) { return p._time_on_site; }),
        array._sum(function (p) { return p._ip; }),cityId, referType,deviceType);
}

function getDayData(hoursOrigin) {
	var dimension=[];
	var origin=hoursOrigin;
	dimension.push(getGroupSum(origin,-1,-1,-1));
	var group=groupArray(origin,'_city_id');
	for(var f in group){
		dimension.push(getGroupSum(group[f],f,-1,-1))
	}
	group=groupArray(origin,'_refer_type');
	for(var f in group){
		dimension.push(getGroupSum(group[f],-1,f,-1))
	}
	group=groupArray(origin,'_device_type');
	for(var f in group){
		dimension.push(getGroupSum(group[f],-1,-1,f))
	}	
	group=groupArray(origin,'_city_id','_refer_type');
	for(var f1 in group){
		var obj=group[f1];
		for(var f2 in obj){
			dimension.push(getGroupSum(obj[f2],f1,f2,-1))
		}
	}
	group=groupArray(origin,'_city_id','_device_type');
	for(var f1 in group){
		var obj=group[f1];
		for(var f2 in obj){
			dimension.push(getGroupSum(obj[f2],f1,-1,f2))
		}
	}	
	group=groupArray(origin,'_refer_type','_device_type');
	for(var f1 in group){
		var obj=group[f1];
		for(var f2 in obj){
			dimension.push(getGroupSum(obj[f2],-1,f1,f2))
		}
	}		
	return dimension;
}
module.exports=getDayData;