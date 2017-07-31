var BaseModel=require('./baseModel.js')
class  ExitModel extends  BaseModel{
        constructor(site_id, report_time,  visit, pv, bounce, uv, new_visitor, time_on_site, ip,refer_type,exist_url, contribPv,exitCount) {
        super(site_id, report_time,  visit, pv, bounce, uv, new_visitor, time_on_site, ip)
        this._contribPv=contribPv;
        this._exist_url=exist_url;
        this._exitCount=exitCount;
        this._refer_type=refer_type;
    }

    set contribPv(temp){this._contribPv=temp}
    set exist_url(temp){this._exist_url=temp}
    set exitCount(temp){this._exitCount=temp}
    set refer_type(temp){this._refer_type=temp}

    get contribPv(){return _contribPv}
    get refer_type(){return _refer_type}
    get exist_url(){return _exist_url}
    get exitCount(){return _exitCount}
}
ExitModel.getInsertSqlValue=function(m){
        return '(' + '\'' + m._site_id + '\',\''  + m._report_time +'\','
        + m._visit + ',' + m._pv + ','  + m._time_on_site + ',' 
        + m._refer_type+ ',\'' + m._exist_url + '\',' + m._contribPv +','+m._exitCount+')';
}
ExitModel.getBatchInsertSql=function(array){
    var sql=[];
    array.forEach(p=>sql.push(ExitModel.getInsertSqlValue(p)));
    return 'insert into s_flow_exit_refer( site_id, report_time, visit, pv,time_on_site, refer_type,exist_url, contribPv,exitCount) values '
     +'\n'+ sql.join(',\n')+';\n' 
}
    module.exports=ExitModel;