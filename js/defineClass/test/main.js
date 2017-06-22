require.config({
    baseUrl: "../../",
});
// 加载路径配置
require(["require.config.paths"], function() {
    require(["app"]);
});

define("app", [
    "jquery", 
    "@defineClass/defineClass", 
    "@NodeTree/NodeTree", 
    "@ComponentBase/component/dropdown"
], function($, defineClass, Node) {
    var node = new Node("father");
    var child1 = new Node("son");
    node.add(child1);
    alert(node.children());
});
