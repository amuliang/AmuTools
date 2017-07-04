(function() {
    // 所有路径都以模块组路径为准，为了兼容node，需要在node中设置变量global.__amu_require__.rootUrl
    // ********************************************************************************************************
    // 为了兼容commonJS，设置module变量
    if(typeof module == "undefined") { 
        module = {
            exports: null
        }
    }

    // ********************************************************************************************************
    // 设置根路径，使得所有模块均使用绝对路径,同样为了兼容commonJS
    global = typeof global == "undefined" ? {} : global;
    global.__amu_require__ = {
        rootUrl: "" // rootUrl要保证定位到模块组目录，因为内部模块路径全部相对模块组路径设置，所以这里为空字符串即可
    }

    // ********************************************************************************************************
    // 将模块规范化，并设置常用模块别名（node_modules下模块）
    var rootPath = global.__amu_require__.rootUrl + ""; // 视您的项目，更改根路径
    require.config({
        paths: {
            "jquery": rootPath + "bower_components/jquery/dist/jquery.min",
            // "@defineClass": rootPath + "defineClass",
            // "@ComponentBase": rootPath + "ComponentBase",
            // "@ModelBase": rootPath + "ModelBase",
            // "@NodeTree": rootPath + "NodeTree",
        },
        shim: {
            "defineClass/defineClass": {
                exports: "module.exports"
            },
            "ComponentBase/ComponentBase": {
                deps: ["jquery", "defineClass/defineClass"],
                exports: "module.exports"
            },
        }
    });

    // ********************************************************************************************************
})();