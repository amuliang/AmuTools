/*
    $("#dd").dropdown({
        data: [
            { name: "name1", value: 1 },
            { name: "name2", value: 2 },
            { name: "name3", value: 3 }
        ],
        onchange: function(control) {
            alert(control.selectedIndex);
        }
    });
*/

define(["jquery", "@defineClass/defineClass", "@ComponentBase/ComponentBase"], function($, defineClass, ComponentBase) {
/*************************************************************************************************************/
defineClass(function dropdown() {
    this.__init__();
}).props({

}).protoProps({
    reset: function(control, config) {
        if(config.data) {
            this.setData(control, config.data);
        }
        if(config.onchange) {
            control.onchange = function() {
                config.onchange(control);
            }
        }
    },
    taggleByValue: function(control, config) {
        var value = config;
        var options = control.options;
        for(var i = 0; i < options.length; i++) {
            if(options[i].value == value) {
                control.selectedIndex = i;
                return;
            }
        }
    },
    setData: function(control, config) {
        var data = config;
        var $control = $(control);
        // 先将所有选项删掉
        $control.children("option").remove();
        for(var i = 0; i < data.length; i++) {
            var new_option =document.createElement("option");
            new_option.innerText = data[i].name;
            new_option.value = data[i].value;
            $control.append(new_option);
        }
    },
    getSelectedValue: function(control) {
        return control.options[control.selectedIndex].value;
    }
}).extend(ComponentBase, true).create().bindToJQuery("dropdown", {
    developers: [ // 开发者名单
        { name: "amuliang", email: "982632988@qq.com" }
    ],
    config: {
        data: [{name:"option1", value: 1}], // 初始化数据
        onchange: function(control) {} // 选项改变事件
    },
    events: {
        taggleByValue: "value 切换当前选项为值为value的选项",
        setData: "data 设置初始化数据",
        getSelectedValue: "获取当前选项的value"
    },
    css_annotation: "",
    description: "" // 描述
        + "下拉选项插件" + "\n"
});
/*************************************************************************************************************/  
});