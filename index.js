var fs=require('fs')
var getHourData=require('./mock/hourData.js');
var getDayData=require('./mock/dayData.js');
var configUtil=require('./config.js');
var HourModel=require('./models/hourDataModel.js')
var DayModel=require('./models/dayDataModel.js')

var FurlModel=require('./models/FlowFurlModel.js')
var EntryurlModel=require('./models/FlowEntryurlModel.js')
var ExiturlModel=require('./models/FlowExiturlModel.js')

var getFurlData=require('./mock/flowFurlData.js');
var getEntryurlData=require('./mock/flowEntryurlData.js');
var getExiturlData=require('./mock/flowExitUrlData.js');

var config=configUtil();
if(!fs.existsSync(config.sqlFilePath))
    fs.mkdirSync(config.sqlFilePath)
function createHourDayData(){
    var hourPath=config.sqlFilePath+'HourMock'+new Date()._format('yyyy-MM-dd')+'.sql';
    var dayPath=config.sqlFilePath+'DayMock'+new Date()._format('yyyy-MM-dd')+'.sql';
    //var fsOptions={encoding: 'utf8',flag:'a',mode:438}
    var begin=config.beginDate;
    var end=config.endDate;
    do{
        var hourData=getHourData(begin);
        fs.appendFileSync(hourPath,HourModel.getBatchInsertSql(hourData.origin));
        fs.appendFileSync(hourPath,HourModel.getBatchInsertSql(hourData.dimension));
        fs.appendFileSync(dayPath,DayModel.getBatchInsertSql(getDayData(hourData.origin)));

    }while(begin.setDate(begin.getDate()+1)<=end)
    console.log('create HourDayData over')
}
function createUrlData(){
    config=configUtil();
    var furlPath=config.sqlFilePath+'furlMock'+new Date()._format('yyyy-MM-dd')+'.sql';
    var entryUrlPath=config.sqlFilePath+'entryUrlMock'+new Date()._format('yyyy-MM-dd')+'.sql';
    var exitUrlPath=config.sqlFilePath+'exitUrlMock'+new Date()._format('yyyy-MM-dd')+'.sql';
    var begin=config.beginDate;
    var end=config.endDate;
    do{
        fs.appendFileSync(furlPath,FurlModel.getBatchInsertSql(getFurlData(begin)));
        fs.appendFileSync(entryUrlPath,EntryurlModel.getBatchInsertSql(getEntryurlData(begin)));
        fs.appendFileSync(exitUrlPath,ExiturlModel.getBatchInsertSql(getExiturlData(begin)));

    }while(begin.setDate(begin.getDate()+1)<=end)
    console.log('create UrlData over')

}

//createHourDayData();
createUrlData()
