var BaseModel=require('./baseModel.js')
class  FurlModel extends  BaseModel{
        constructor(site_id, report_time,  visit, pv, bounce, uv, new_visitor, time_on_site, ip,refer_type,url, contribPv,entryCount,exitCount) {
        super(site_id, report_time,  visit, pv, bounce, uv, new_visitor, time_on_site, ip)
        this._contribPv=contribPv;
        this._url=url;
        this._entryCount=entryCount;
        this._exitCount=exitCount;
        this._refer_type=refer_type;
    }

    set contribPv(temp){this._contribPv=temp}
    set entryCount(temp){this._entryCount=temp}
    set url(temp){this._url=temp}
    set exitCount(temp){this._exitCount=temp}
    set refer_type(temp){this._refer_type=temp}

    get contribPv(){return _contribPv}
    get refer_type(){return _refer_type}
    get url(){return _url}
    get entryCount(){return _entryCount}
    get exitCount(){return _exitCount}
}
FurlModel.getInsertSqlValue=function(m){
        return '(' + '\'' + m._site_id + '\',\''  + m._report_time +'\','
        + m._visit + ',' + m._pv + ','  + m._time_on_site + ',' 
        + m._refer_type+ ',\'' + m._url + '\',' + m._contribPv +','+m._entryCount+','+m._exitCount+')';
}
FurlModel.getBatchInsertSql=function(array){
    var sql=[];
    array.forEach(p=>sql.push(FurlModel.getInsertSqlValue(p)));
    return 'insert into s_flow_furl_refer( site_id, report_time, visit,pv,  time_on_site, refer_type,url, contribPv,entryCount,exitCount) values '
     +'\n'+ sql.join(',\n')+';\n' 
}
module.exports=FurlModel;