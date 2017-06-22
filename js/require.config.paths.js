(function() {
    var rootPath = ""; // 视您的项目，更改根路径
    require.config({
        paths: {
            "jquery": rootPath + "bower_components/jquery/dist/jquery.min",
            "@defineClass": rootPath + "defineClass/defineClass",
            "@ComponentBase": rootPath + "ComponentBase/ComponentBase",
            "@component": rootPath + "ComponentBase/component",
            "@ModelBase": rootPath + "ModelBase/ModelBase",
            "@NodeTree": rootPath + "NodeTree/NodeTree",
        }
    });
})();