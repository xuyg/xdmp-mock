var fs=require('fs')
var getHourData=require('./mock/hourData.js');
var getDayData=require('./mock/dayData.js');
var config=require('./config.js')();
var HourModel=require('./models/hourDataModel.js')
var DayModel=require('./models/dayDataModel.js')
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
    console.log('createHourDayData over')
}
createHourDayData();
