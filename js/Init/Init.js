var AmuTools = {
    checkEnv: function(vars) {
        for(var i = 0; i < vars.length; i++) {
            if(typeof window[vars[i]] == "undefined") {
                throw new Error("当前环境缺少变量\"" + vars[i] + "\"的定义");
            }
            if(window[vars[i]] == null) {
                throw new Error("当前环境变量\"" + vars[i] + "\"的值为null");
            }
        }
    }
}