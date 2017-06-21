/*************************************************************************************************************
    pagination 分页
*/
defineClass(function pagination() {
    this.__init__();

}).props({
    // 变量
    rowCount: 0, // 总共多少条数据
    currentPageIndex: 1, // 当前到了第页
    showNum: 10, // 每页显示多少条数据
    firstEventable: true, // 初始化后第一次响应事件是否执行
    // 辅助变量
    pageNum: 0, // 总共有多少页
    realIndexNum: 0, // 实际显示多少个页码
    $firstPage: null,
    $prevPage: null,
    $nextPage: null,
    $lastPage: null,
    $indexPage: null, // 它来决定显示多少个页码
    stater: null, // 状态注册器
    needRefresh: true, // 是否需要刷新
    // 事件
    onPageChanged: function (pageIndex, showNum) { }

}).protoProps({
    reset: function (control, config) {
        this.needRefresh = true;
        this.bind(control, config);
    },
    bind: function (control, config) { // 对组件进行逻辑绑定
        // 重新配置config
        if (typeof config == "object") this.setConfig(config);
        // 辅助变量初始化
        var _this = this;
        var $control = $(control);
        this.$firstPage = $control.find(".page-first");
        this.$lastPage = $control.find(".page-last");
        this.$prevPage = $control.find(".page-prev");
        this.$nextPage = $control.find(".page-next");
        this.$indexPage = $control.find(".page-index");
        this.pageNum = Math.ceil(this.rowCount / this.showNum);
        this.realIndexNum = Math.min(this.pageNum, this.$indexPage.length);
        // 注册状态
        this.stater = new Stater({
            click: {
                first: function () { _this.pageJumpTo(1) },
                last: function () { _this.pageJumpTo(_this.pageNum) },
                prev: function () { _this.pageJumpTo(_this.currentPageIndex - 1) },
                next: function () { _this.pageJumpTo(_this.currentPageIndex + 1) },
                index: function () { _this.pageJumpTo($(this).data("index")) },
            }
        });
        this.stater.state("first", function (data) {
            this.click(data.click.first);
        }).state("last", function (data) {
            this.click(data.click.last);
        }).state("prev", function (data) {
            this.click(data.click.prev);
        }).state("next", function (data) {
            this.click(data.click.next);
        }).state("index", function (data) {
            this.click(data.click.index);
        }).state("active", function (data) {
            this.addClass("page-active");
        }).state("normal", function (data) {
            this.removeClass("page-active");
            this.removeClass("page-invalid");
        }).state("invalid", function (data) {
            this.addClass("page-invalid");
        });
        // 为元素绑定事件
        this.stater.target(this.$firstPage).state("first");
        this.stater.target(this.$lastPage).state("last");
        this.stater.target(this.$prevPage).state("prev");
        this.stater.target(this.$nextPage).state("next");
        this.$indexPage.each(function (index, element) {
            var $element = $(element);
            if (index < _this.realIndexNum) {
                $element.css("display", "inline-block");
                _this.stater.target($element).state("index");
            } else {
                $element.css("display", "none");
            }
        });
        //
        this.setPageIndex(this.currentPageIndex);
        this.pageJumpTo(this.currentPageIndex);
    },
    pageJumpTo: function(pageIndex) { // 跳转到某一页
        if (!this.firstEventable) {
            this.firstEventable = true;
            return;
        }
        pageIndex = Math.max(Math.min(this.pageNum, pageIndex), 1);
        if (!this.needRefresh && this.currentPageIndex == pageIndex) return;
        if (this.needRefresh) this.needRefresh = false;
        //
        this.onPageChanged(pageIndex, this.showNum);
        this.setPageIndex(pageIndex);
    },
    setPageIndex: function (pageIndex) { // 设置index
        this.currentPageIndex = pageIndex;
        //
        var _this = this;
        // 首先找到应该显示的页码最小值
        if (this.pageNum > this.realIndexNum) { // 
            var minIndex = pageIndex - Math.floor(this.realIndexNum / 2);
            minIndex = Math.min(minIndex, this.pageNum - this.realIndexNum + 1);
            minIndex = Math.max(minIndex, 1);
        } else {
            var minIndex = 1;
        }
        // 更新分页元素状态，包括页码值得更改
        this.$indexPage.each(function (index, element) {
            if (index < _this.realIndexNum) {
                var $element = $(element);
                $element.data("index", minIndex);
                $element.html(minIndex);
                if (minIndex == pageIndex) {
                    _this.stater.target($element).state("active");
                } else {
                    _this.stater.target($element).state("normal");
                }
                minIndex++;
            }
        });
        this.stater.target(this.$firstPage).state(pageIndex == 1 ? "invalid" : "normal");
        this.stater.target(this.$prevPage).state(pageIndex == 1 ? "invalid" : "normal");
        this.stater.target(this.$nextPage).state(pageIndex == this.pageNum ? "invalid" : "normal");
        this.stater.target(this.$lastPage).state(pageIndex == this.pageNum ? "invalid" : "normal");
    },
    setConfig: function (config) { // 配置变量
        this.rowCount = config.rowCount || this.rowCount;
        this.currentPageIndex = config.currentPageIndex || this.currentPageIndex;
        this.showNum = config.showNum || this.showNum;
        this.firstEvent = config.firstEvent || this.firstEvent;
        this.onPageChanged = config.onPageChanged || this.onPageChanged;
    },

}).extend(ComponentBase, true).create().bindToJQuery("pagination");