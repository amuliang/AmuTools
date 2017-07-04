global.__amu_require__ = {
    rootUrl: "f:/webproject/AmuTools/js/" // 定位到模块组
}

const defineClass = require(global.__amu_require__.rootUrl + "defineClass/defineClass");
const ComponentBase = require(global.__amu_require__.rootUrl + "ComponentBase/ComponentBase");

console.log(ComponentBase);