var DayModel=require('./dayDataModel.js')
class HourModel  extends  DayModel{
    constructor(site_id, report_time,  visit, pv, bounce, uv, new_visitor, time_on_site, ip,city_id, refer_type, device_type,hour) {
        super(site_id, report_time,  visit, pv, bounce, uv, new_visitor, time_on_site, ip,city_id, refer_type, device_type)
        this._hour = hour;
    }
    get hour() { return this._hour }
    set hour(temp) { this._hour = temp }

}
HourModel.getInsertSqlValue=function(m){
        return '(' + '\'' + m._site_id + '\',\''  + m._report_time +'\','
        + m._visit + ',' + m._pv + ',' + m._bounce + ',' + m._uv + ',' + m._new_visitor + ',' + m._time_on_site + ',' + m._ip + ','
        + m._city_id + ',' + m._refer_type + ',' + m._device_type +','+m._hour+')';
}
HourModel.getBatchInsertSql=function(array){
    var sql=[];
    array.forEach(p=>sql.push(HourModel.getInsertSqlValue(p)));
    return 'insert into s_flow_hour_refer_device_city( site_id, report_time, visit, pv, bounce, uv, new_visitor, time_on_site, ip,city_id, refer_type, device_type,hour) values '
     +'\n'+ sql.join(',\n')+';\n' 
}
module.exports=HourModel;