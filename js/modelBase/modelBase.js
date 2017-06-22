define(["@defineClass"], function(defineClass) {
/*************************************************************************************************************/
/***************model基类*****************************************************/
const ModelBase = defineClass(function ModelBase() {
    this.__init__();

}).protoProps({
    applyDefaultValue: function(data) { // 这里是将定义的静态属性赋予给对象用
        var data = data || {};
        var cons = this.__proto__.constructor;
        var temp_prop;
        for(var i in cons) {
            if(cons[i] instanceof ModelColumn) {
                Object.defineProperty(this, i, get_set(this, i));
                this[i] = data.hasOwnProperty(i) ? data[i] : cons[i].default;
            }
        }

        function get_set(target, key) {
            var temp_prop;
            return {
                get: function() {
                    return temp_prop;
                },
                set: function(value) {
                    var result = target.__proto__.constructor[key].format(value);
                    temp_prop = result.value;
                    //if(result.error) console.warn(result.error);
                },
                enumerable: true
            }
        }
    }

}, { configurable: false, writable: false, enumerable: false }).create();

/************ 字段类 *******************************************************/
const ModelColumn = defineClass(function ModelColumn(data) {
    for(var i in data) {
        this[i] = data[i];
    }
    this.__init__();

}).props({
    name: null, // 字段名
    size: null, // 内容长度
    default: null, // 默认值
    check: null, // 为函数或者正则表达式
    options: null, // 选项
    isnull: true, // 是否可为空

}, { configurable: false, writable: false }).protoProps({
    format: function(value) {
        var return_value = {
            value: this.default,
            error: null,
        }
        if(typeof(value) == "undefined" || value == null) {
            // 如果值未定义或者为空，则返回默认值
            if(!this.isnull) return_value.error = `属性“${this.name}”值不能为空`;
            else if(this.check && typeof this.check == "function") this.check(value, return_value);
        }else {
            // 如果值不为空
            var str_value = value.toString();
            if(this.size){
                // 先判断长度
                if(typeof(value) == "number") {
                    // 如果是数字
                    if(str_value.length > this.size) {
                        return_value.value = parseFloat(str_value.substring(0, this.size));
                        return_value.error = `属性“${this.name}”最大长度为${this.size},值"${str_value}"超出最大长度`;
                    }else {
                        return_value.value = value;
                    }
                }else {
                    // 否则一律当做字符串处理
                    if(str_value.length > this.size) {
                        return_value.value = str_value.substring(0, this.size);
                        return_value.error = `属性“${this.name}”最大长度为${this.size},值"${str_value}"超出最大长度`;
                    }else {
                        return_value.value = str_value;
                    }
                }
            }
            if(this.options) {
                // 如果是选项属性
                var has_value = false;
                for(var i = 0; i < this.options.length; i++) {
                    if(value == this.options[i]) { has_value = true; break; }
                }
                if(has_value == false) {
                    return_value.error = `属性“${this.name}”为选项属性，值“${str_value}”不在选项数组中`;
                }
            }else if(this.check) {
                // 如果还有check，则进行check检测
                if(this.check instanceof RegExp) {
                    if(this.check.test(str_value)) {
                        return_value.value = value;
                    }else {
                        return_value.error = `属性“${this.name}”的值“${str_value}”正则不匹配`;
                    }
                }else if(typeof this.check == "function") {
                    this.check(value, return_value);
                }
            }
        }
        return return_value;
    }

}).create();


return {
    ModelBase: ModelBase,
    ModelColumn: ModelColumn
}
/*************************************************************************************************************/  
});