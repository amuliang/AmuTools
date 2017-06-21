/*************************************************************************************************************/
/* 组件类，所有组件都继承Component类，提供基础静态函数
    bindToJQuery: 将会把组件接口提供给jquery

    接口函数：
        noConflict: 用来解决组件名称与jquery冲突问题，还原原属性并将现有组件接口返回出来

        $.fn.componentName2 = $.fn.componentName.noConflict();
*/
AmuTools.checkEnv(["defineClass"]);

var ComponentBase = defineClass(function ComponentBase() {
    this.__init__();

}).protoProps({
    bind: function () { },

}).staticProps({
    bindToJQuery: function (name, info) { // 这里提供一个name参数，因为在ie中无法自己读取到函数名称
        // 辅助变量
        var constructor = this;
        var NAME = name || constructor.name;
        var DATA_KEY = "bs." + NAME;
        var JQUERY_NO_CONFLICT = $.fn[NAME]; // 为了防止和jquery的同名属性冲突
        // 创建接口
        function _jQueryInterface(key, value) {
            return this.map(function () {
                var $element = $(this);
                var data = $element.data(DATA_KEY);
                // 如果组件还未被绑定则新建组件类
                if (!data) {
                    data = new constructor();
                    $element.data(DATA_KEY, data);
                }
                // 解析参数
                if (!key || typeof key == "object") {
                    value = key;
                    key = "reset";
                }
                if (typeof data[key] == "function") {
                    var result = data[key](this, value);
                    if(typeof result == "undefined") return this;
                    else return result;
                } else {
                    throw new Error("不包含命令" + key);
                }
            });
        }
        _jQueryInterface.info = info;

        _jQueryInterface.constructor = constructor; // constructor
        _jQueryInterface.noConflict = function () { // noConflict
            $.fn[NAME] = JQUERY_NO_CONFLICT;
            return _jQueryInterface;
        }
        // 将接口提供给jquery
        $.fn[NAME] = _jQueryInterface;
    }

}).create();