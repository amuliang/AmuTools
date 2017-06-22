/*************************************************************************************************************/
/* Stater 状态注册器
    var st = new Stater();
    st.state("active", function(data){
        data.name = "xixi";
    });
*/
define(["@defineClass/defineClass"], function(defineClass) {
/*************************************************************************************************************/
return defineClass(function Stater(data) {
    this.__init__();
    if (typeof data == "object") this.data = data;

}).props({
    map: { value: {} },
    data: { value: {} },
    tempTarget: { value: {} },

}).protoProps({
    state: function (key, func) {
        if (!key) return;
        //
        if (!func && this.map[key]) { // 切换状态
            this.map[key].call(this.tempTarget, this.data);
        }else if (typeof key == "string" && typeof func == "function") { // 注册状态
            this.map[key] = func;
        }
        return this;
    },
    target: function(control) {
        if(control) this.tempTarget = control;
        return this;
    },
    bindTo: function (control) {
        var _this = this;
        control["state"] = function state(key, value) {
            _this.target(this).state(key, value);
        }
    }

}).create();
/*************************************************************************************************************/  
});