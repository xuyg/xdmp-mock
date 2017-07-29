var config=require('../config.js')()
var groupArray = require('group-array');
var HourModel=require('../models/hourDataModel.js')
var DayModel=require('../models/dayDataModel.js')
require('../utils/Array.js')
require('../utils/Date.js')
var mock=require('../utils/mock.js');
var randomNum=mock.randomNum;
var randomCity=mock.randomCity;
var randomRefer=mock.randomRefer;
var randomDevice=mock.randomDevice;



function getOriginArray(date,hour) {
	var hours=[];
	var reportTime=date._format('yyyy-MM-dd');
	    for (var i = 0; i < 10; i++) {
        var m = new HourModel(config.siteId, reportTime, 
            randomNum(), randomNum(), randomNum(), randomNum(), randomNum(), randomNum(), randomNum(),
            randomCity(),randomRefer(),randomDevice(),hour);
        hours.push(m);
    }
    return hours;
}
function getGroupSum(array,cityId,referType,deviceType){
	return new HourModel(array._first()._site_id, array._first()._report_time, 
        array._sum(function (p) { return p._visit; }),
        array._sum(function (p) { return p._pv; }),
        array._sum(function (p) { return p._bounce; }),
        array._sum(function (p) { return p._uv; }),
        array._sum(function (p) { return p._new_visitor; }),
        array._sum(function (p) { return p._time_on_site; }),
        array._sum(function (p) { return p._ip; }),cityId, referType,deviceType,array._first().hour);
}

function getHourData(date){
	var originArray=[];
	var dimension=[];
	for(var i=1;i<25;i++){
		var origin=getOriginArray(date,i);
		originArray=originArray.concat(origin)
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
	}
	return {
		dimension:dimension,
		origin:originArray
	}
}

module.exports=getHourData;