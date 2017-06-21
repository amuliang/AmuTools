; var Node = (function () {
//************************* begin *************************************************************************************

function Node(data, prev, next) {
    this.data = data;
    this._next = prev;
    this._prev = next;
    this._head = null;
    this._tail = null;
    this.length = 0;
    this.parent = null;
}

Node.prototype.add = function (node) {
    if (this._tail == null) {
        this._head = this._tail = node;
    } else {
        this._tail._next = node;
        node._prev = this._tail;
        this._tail = node;
    }
    this.length++;
    node.parent = this;
    return node;
}

Node.prototype.remove = function (node) {
    var prev = node._prev;
    var next = node._next;
    if (prev) prev._next = next;
    if (next) next._prev = prev;
    if (this._head == node) this._head = next;
    if (this._tail == node) this._tail = prev;
    this.length--;
    node.parent = null;
}

Node.prototype.clear = function () {
    this._head = this._tail = null;
    this.length = 0;
}

Node.prototype.length = function () {
    var i = 0;
    var node = this._head;
    while (node) {
        i++;
        node = node._next;
    }
    this.length = i;
    return i;
}

Node.prototype.children = function () {
    var i = 0;
    var children = [];
    var node = this._head;
    while (node) {
        i++;
        children.push(node);
        node = node._next;
    }
    this.length = i;
    return children;
}

Node.prototype.each = function (fn) {
    var node = this._head;
    while (node) {
        fn(node);
        node = node._next;
    }
}

Node.prototype.next = function () {
    return this._next;
}

Node.prototype.prev = function () {
    return this._prev;
}

Node.prototype.head = function () {
    return this._head;
}

Node.prototype.tail = function () {
    return this._tail;
}

Node.prototype.find = function(fn) {
    var node = this._head;
    while (node) {
        if (fn(node)) { // 检测当前节点
            return node;
        }
        else { // 检测子节点
            var result = node.find(fn);
            if (result) return result;
        }
        node = node._next;
    }
    return null; // 如果执行到这一步，太不幸了，没有符合条件的节点
}

//****************************************************************************
Node.arrayToTree = function (arr, fn) {
    var len = arr.length;
    // 构建一个node数组
    var nodes = [];
    for (var i = 0; i < len; i++) {
        nodes.push(new Node(arr[i]));
    }
    // 基于node数组构建树
    for (var i = 0; i < len; i++) {
        for (var j = 0; j < len; j++) {
            if (i == j || nodes[j].parent != null) continue; // 如果j已经有了父级，则不需要再对比
            if (fn(nodes[i].data, nodes[j].data)) { // 检测i是不是j的父级
                nodes[i].add(nodes[j]);
            }
        }
    }
    // 如果没有父级，说明是根节点，将所有根节点绑定到一个总的根节点上
    var root = new Node();
    for (var i = 0; i < len; i++) {
        if (nodes[i].parent == null) {
            root.add(nodes[i]);
        }
    }
    return root;
}
Node.prototype.toJson = function (fn) {
    fn = fn || function default_fn(node) { for (var i in node.data) this[i] = node.data[i]; }
    var node = this;
    var new_obj = {};
    // 属性
    fn.apply(new_obj, [node]);
    // 子集，items
    new_obj.items = [];
    node.children().forEach(function (ele) {
        new_obj.items.push(ele.toJson(fn));
    });
    return new_obj;
}
Node.toJson = function (node, fn) {
    return node.toJson(fn);
}
Node.parseJson = function (json, fn) {
    fn = fn || function (data_json) { for (var i in data_json) this[i] = data_json[i]; }
    var node = new Node({});
    // 属性
    var data_json = {};
    for (var i in json) {
        if (i == "items") continue;
        data_json[i] == json[i];
    }
    fn.apply(node.data, [data_json]);
    // 子集
    if(!json.items) return node;
    for (var i = 0; i < json.items.length; i++) {
        node.add(Node.parseJson(json.items[i], fn));
    }
    return node;
}

return Node;
//********************* end **********************************************************************************************
})();


