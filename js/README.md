### 说明
本模块集合采用AMD规范，为方便用户引用，所有模块依赖均采用别名，用户只需更改别名即可。

别名配置在require.config.paths.js文件中
```
(function() {
    var rootPath = ""; // 视您的项目，更改根路径
    require.config({
        paths: {
            "jquery": rootPath + "bower_components/jquery/dist/jquery.min",
            "@defineClass": rootPath + "defineClass",
            "@ComponentBase": rootPath + "ComponentBase",
            "@NodeTree": rootPath + "NodeTree/",
        }
    });
})();
```
当您需要引用本模块集合时，建议如下书写
```
require.config({
    baseUrl: "yourpath",
});
// 加载路径配置
require(["somepath/require.config.paths"], function() {
    require(["app"]);
});

define("app", ["jquery", "@defineClass", "@NodeTree"], function($, defineClass, Node) {
    var node = new Node("father");
    var child1 = new Node("son");
    node.add(child1);
    alert(node.children());
});
```