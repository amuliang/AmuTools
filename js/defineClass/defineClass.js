; var defineClass = (function () {
    // 判断IE版本，IE8及其以下版本是不支持defineProperty的
    if (typeof(navigator) != "undefined" && new RegExp("MSIE (\\d+\\.\\d+);").test(navigator.userAgent) && parseFloat(RegExp["$1"]) < 9) {
        throw new Error("The version less than IE9 is not supported");
    }

    var _constructor, _props, _protoProps, _staticProps, _extends;
    var _props_config, _protoProps_config, _staticProps_config;
    var _inhertSuperClassStatic;

    function defineClass(constructor) {
        _constructor = _props = _protoProps = _staticProps = _extends = null;
        _props_config = _protoProps_config = _staticProps_config = null;
        _inhertSuperClassStatic = false;
        _constructor = constructor;
        return _defineClass;
    }

    var _defineClass = {};
    _addProps(_defineClass, {
        props: function (props, config) {
            _props = props;
            _props_config = config;
            return _defineClass;
        },
        protoProps: function (protoProps, config) {
            _protoProps = protoProps;
            _protoProps_config = config;
            return _defineClass;
        },
        staticProps: function (staticProps, config) {
            _staticProps = staticProps;
            _staticProps_config = config;
            return _defineClass;
        },
        extend: function (extend, inhertParent) {
            _extends = extend;
            _inhertSuperClassStatic = inhertParent || _inhertSuperClassStatic;
            return _defineClass;
        },
        create: function () {
             return _createClass(_constructor, _props, _props_config, _protoProps, _protoProps_config, _staticProps, _staticProps_config, _extends);
        }
    }, {
        enumerable: false,
        configurable: false,
        writable: false
    });

    function _createClass(subClass, props, props_config, protoProps, protoProps_config, staticProps, staticProps_config, superClass) {
        if (!subClass) {
            throw new ReferenceError("constructor must be a function");
        } else {
            if (typeof subClass != "function") {
                throw new ReferenceError("constructor must be a function");
            } else if (subClass.name == "") {
                throw new ReferenceError("constructor must have a name");
            }
        }

        var hasSuperClass = false;
        if (superClass && typeof superClass == "function") {
            hasSuperClass = true;
            // 继承
            /*     
                这里相当于
                    subClass.prototype = {
                        __proto__: superClass.prototype,
                        constructor: subClass
                    };
                但是IE10-都不支持__proto__
            */
            subClass.prototype = Object.create(superClass.prototype);
            subClass.prototype.constructor = subClass;
        }

        protoProps = protoProps || {};
        // 核心函数，它的作用为继承变量
        protoProps.__init__ = {
            value: function (notSelf) {
                if (hasSuperClass) {
                    // 找到父级的初始化函数
                    var super__init__ = superClass.prototype.__init__;
                    if (super__init__ && typeof super__init__ == "function") super__init__.call(this, true);
                }
                // 添加自身属性，放在最后是为了覆盖父级
                _addProps(this, props, props_config, notSelf);
            },
            writable: false,
            enumerable: false,
            configurable: false
        }
        // 核心函数，它的作用为继承静态属性，当extend(subClass, true)时，会继承父级的静态属性
        protoProps.__init_static__ = {
            value: function (notSelf) {
                // 判断是否继承父级的静态属性
                if (_inhertSuperClassStatic && hasSuperClass) {
                    // 找到父级的静态变量初始化函数
                    var super__init_static__ = superClass.prototype.__init_static__;
                    if (super__init_static__ && typeof super__init_static__ == "function") super__init_static__.call(this, true);
                }
                // 添加自身属性，放在最后是为了覆盖父级
                _addProps(this, staticProps, staticProps_config, notSelf);
            },
            writable: false,
            enumerable: false,
            configurable: false
        }
        // 添加静态属性
        protoProps.__init_static__.value.call(subClass); // 1从这里进去之后，staticProps属性值就为null了，2正常
        // 添加原型属性
        _addProps(subClass.prototype, protoProps, protoProps_config);

        return subClass;
    }

    // notSelf是判断属性继承的辅助变量
    function _addProps(target, props, config, notSelf) {
        if (!props) return;

        if(config) {
            config = {
                enumerable: typeof config.enumerable != "undefined" ? config.enumerable : true, // 优先设为可枚举
                configurable: typeof config.configurable != "undefined" ? config.configurable : true, // 优先设为可配置，可删除，这是比较常规方式
                writable: typeof config.writable != "undefined" ? config.writable : true // 优先设为可写，毕竟只读属性很少
            }
        }else {
            config = {
                enumerable: true, // 优先设为可枚举
                configurable: true, // 优先设为可配置，可删除，这是比较常规方式
                writable: true // 优先设为可写，毕竟只读属性很少
            }
        }

        for (var key in props) {
            var descriptor = props[key];
            // 判断属性是否可继承
            if (notSelf && typeof descriptor.inheritable != "undefined" && descriptor.inheritable == false) {
                continue;
            }
            if (descriptor != null && typeof descriptor == "object" && ("value" in descriptor || "get" in descriptor)) {
                descriptor.enumerable = typeof descriptor.enumerable != "undefined" ? descriptor.enumerable : config.enumerable;
                descriptor.configurable = typeof descriptor.configurable != "undefined" ? descriptor.configurable : config.configurable;
                if ("value" in descriptor) {
                    descriptor.writable = typeof descriptor.writable != "undefined" ? descriptor.writable : config.writable;
                }
            } else {
                descriptor = {
                    value: descriptor,
                    enumerable: config.enumerable,
                    configurable: config.configurable,
                    writable: config.writable
                }
            }
            // 这里允许在__init__执行前指定属性的默认值
            var new_descriptor = {};
            if(target[key]) { // 之所以要拷贝是因为我们并不想破坏原来的结构，因为这种破坏是永久性的
                for(var i in descriptor) {
                    new_descriptor[i] = descriptor[i]
                }
                new_descriptor.value = target[key];
            }else {
                new_descriptor = descriptor;
            }
            // 
            Object.defineProperty(target, key, new_descriptor);
        }
    }

    return defineClass;
})();

if(typeof module != "undefined") module.exports = defineClass;