var BaseModel=require('./baseModel.js')
class  EntryurlModel extends  BaseModel{
        constructor(site_id, report_time,  visit, pv, bounce, uv, new_visitor, time_on_site, ip,refer_type,entry_url, contribPv,entryCount) {
        super(site_id, report_time,  visit, pv, bounce, uv, new_visitor, time_on_site, ip)
        this._contribPv=contribPv;
        this._entry_url=entry_url;
        this._entryCount=entryCount;
        this._refer_type=refer_type;
    }

    set contribPv(temp){this._contribPv=temp}
    set entryCount(temp){this._entryCount=temp}
    set url(temp){this._url=temp}
    set refer_type(temp){this._refer_type=temp}

    get contribPv(){return _contribPv}
    get refer_type(){return _refer_type}
    get entry_url(){return _entry_url}
    get entryCount(){return _entryCount}
}
EntryurlModel.getInsertSqlValue=function(m){
        return '(' + '\'' + m._site_id + '\',\''  + m._report_time +'\','
        + m._visit + ','+m._pv+','  + m._time_on_site + ',' 
        + m._refer_type+ ',\'' + m._entry_url + '\',' + m._contribPv +','+m._entryCount+')';
}
EntryurlModel.getBatchInsertSql=function(array){
    var sql=[];
    array.forEach(p=>sql.push(EntryurlModel.getInsertSqlValue(p)));
    return 'insert into s_flow_entry_refer( site_id, report_time, visit, pv, time_on_site, refer_type,entry_url, contribPv,entryCount) values '
     +'\n'+ sql.join(',\n')+';\n' 
}
    module.exports=EntryurlModel;