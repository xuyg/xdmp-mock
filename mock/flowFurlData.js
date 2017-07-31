var config=require('../config.js')()
var groupArray = require('group-array');
var urlModel=require('../models/FlowFurlModel.js')
require('../utils/Array.js')
require('../utils/Date.js')
var mock=require('../utils/mock.js');
var randomNum=mock.randomNum;
var randomCity=mock.randomCity;
var randomRefer=mock.randomRefer;
var randomDevice=mock.randomDevice;
var randomUrl=mock.randomUrl;

function getGroupSum(array,url,referType){
	return new urlModel(array._first()._site_id, array._first()._report_time, 
        array._sum(function (p) { return p._visit; }),
        array._sum(function (p) { return p._pv; }),
        array._sum(function (p) { return p._bounce; }),
        array._sum(function (p) { return p._uv; }),
        array._sum(function (p) { return p._new_visitor; }),
        array._sum(function (p) { return p._time_on_site; }),
        array._sum(function (p) { return p._ip; }), 
        referType,url,
       array._sum(function (p) { return p._contribPv; }),array._sum(function (p) { return p._entryCount; }),array._sum(function (p) { return p._exitCount; }));
}

function getData(date){
     var origin=[];
    var reportTime=date._format('yyyy-MM-dd');
	    for (var i = 0; i < 100; i++) {
        var m = new urlModel(config.siteId, reportTime, 
            randomNum(), randomNum(), randomNum(), randomNum(), randomNum(), randomNum(), randomNum(),
            randomRefer(),randomUrl(),randomNum(),randomNum(),randomNum());
        origin.push(m);
    }
    var result=[];
    var group=groupArray(origin,'_url','_refer_type');
    for(var f1 in group){
        var obj=group[f1];
        for(var f2 in obj){
            result.push(getGroupSum(obj[f2],f1,f2))
        }
    }
    return result;
}

module.exports=getData;