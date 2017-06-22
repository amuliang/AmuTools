require.config({
    baseUrl: ".",
});

require(["require.config.paths"], function() {
    require(["app"]);
});

define("app", ["jquery", "ComponentBase/component/dropdown"], function($, dropdown) {
    // $("#dd").dropdown({
    //     data: [
    //         { name: "name1", value: 1 },
    //         { name: "name2", value: 2 },
    //         { name: "name3", value: 3 }
    //     ],
    //     onchange: function(control) {
    //         alert(control.selectedIndex);
    //     }
    // });
    // $("#dd").dropdown("taggleByValue", "2");
    // console.log($("#dd").dropdown("getSelectedValue")[0]);
});