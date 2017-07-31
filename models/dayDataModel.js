var BaseModel=require('./baseModel.js')

class DayModel  extends  BaseModel{
    constructor(site_id, report_time,  visit, pv, bounce, uv, new_visitor, time_on_site, ip,city_id, refer_type, device_type) {
    	super(site_id, report_time, visit, pv, bounce, uv, new_visitor, time_on_site, ip);
        this._city_id = city_id; this._device_type = device_type; 
        this._refer_type = refer_type; 
    }
    set city_id(temp) { this._city_id = temp }
    set refer_type(temp) { this._refer_type = temp }
    set device_type(temp) { this._device_type = temp }
    get city_id() { return this._city_id }
    get refer_type() { return this._refer_type }
    get device_type() { return this._device_type }
}
DayModel.getInsertSqlValue=function(m){
        return '(' + '\'' + m._site_id + '\',\''  + m._report_time +'\','
        + m._visit + ',' + m._pv + ',' + m._bounce + ',' + m._uv + ',' + m._new_visitor + ',' + m._time_on_site + ',' + m._ip + ','
        + m._city_id + ',' + m._refer_type + ',' + m._device_type +')';
}
DayModel.getBatchInsertSql=function(array){
    var sql=[];
     array.forEach(p=>sql.push(DayModel.getInsertSqlValue(p)));
    return 'insert into  s_flow_daily_refer_device_city( site_id, report_time, visit, pv, bounce, uv, new_visitor, time_on_site, ip,city_id, refer_type, device_type) values '
    +'\n'+ sql.join(',\n')+';\n' 
}
module.exports=DayModel;