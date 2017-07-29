class BaseModel {
    constructor(site_id, report_time, visit, pv, bounce, uv, new_visitor, time_on_site, ip) {
        this._bounce = bounce;
        this._ip = ip;
        this._new_visitor = new_visitor; this._pv = pv;
        this._report_time = report_time; this._site_id = site_id; this._time_on_site = time_on_site; this._uv = uv; this._visit = visit;
    }
    set site_id(temp) { this._site_id = temp }
    set report_time(temp) { this._report_time = temp }
    set visit(temp) { this._visit = temp }
    set pv(temp) { this._pv = temp }
    set bounce(temp) { this._bounce = temp }
    set uv(temp) { this._uv = temp }
    set new_visitor(temp) { this._new_visitor = temp }
    set time_on_site(temp) { this._time_on_site = temp }
    set ip(temp) { this._ip = temp }

    get site_id() { return this._site_id }
    get report_time() { return this._report_time }
    get visit() { return this._visit }
    get pv() { return this._pv }
    get bounce() { return this._bounce }
    get uv() { return this._uv }
    get new_visitor() { return this._new_visitor }
    get time_on_site() { return this._time_on_site }
    get ip() { return this._ip }

    getInsertSqlValue() {
        
    }
}
module.exports=BaseModel;