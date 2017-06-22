(function() {
    var rootPath = ""; // 视您的项目，更改根路径
    require.config({
        paths: {
            "jquery": rootPath + "bower_components/jquery/dist/jquery.min",
            "@defineClass": rootPath + "defineClass",
            "@ComponentBase": rootPath + "ComponentBase",
            "@ModelBase": rootPath + "ModelBase",
            "@NodeTree": rootPath + "NodeTree",
        }
    });
})();