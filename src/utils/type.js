export default {
    //是否字符串
    isString(o) {
        return Object.prototype.toString.call(o).slice(8, -1) === 'String'
    },
    //是否数字
    isNumber(o) {
        return Object.prototype.toString.call(o).slice(8, -1) === 'Number'
    },
    //是否boolean
    isBoolean(o) {
        return Object.prototype.toString.call(o).slice(8, -1) === 'Boolean'
    },
    //是否函数
    isFunction(o) {
        return Object.prototype.toString.call(o).slice(8, -1) === 'Function'
    },
    //是否为null
    isNull(o) {
        return Object.prototype.toString.call(o).slice(8, -1) === 'Null'
    },
    //是否undefined
    isUndefined(o) {
        return Object.prototype.toString.call(o).slice(8, -1) === 'Undefined'
    },
    //是否对象
    isObj(o) {
        return Object.prototype.toString.call(o).slice(8, -1) === 'Object'
    },
    //是否数组
    isArray(o) {
        return Object.prototype.toString.call(o).slice(8, -1) === 'Array'
    },
    //是否时间
    isDate(o) {
        return Object.prototype.toString.call(o).slice(8, -1) === 'Date'
    },
    //是否正则
    isRegExp(o) {
        return Object.prototype.toString.call(o).slice(8, -1) === 'RegExp'
    },
    //是否错误对象
    isError(o) {
        return Object.prototype.toString.call(o).slice(8, -1) === 'Error'
    },
    //是否Symbol函数
    isSymbol(o) {
        return Object.prototype.toString.call(o).slice(8, -1) === 'Symbol'
    },
    //是否Promise对象
    isPromise(o) {
        return Object.prototype.toString.call(o).slice(8, -1) === 'Promise'
    },
    //是否Set对象
    isSet(o) {
        return Object.prototype.toString.call(o).slice(8, -1) === 'Set'
    },
    isFalse(o) {
        if (!o || o === 'null' || o === 'undefined' || o === 'false' || o === 'NaN') return true
        return false
    },
    isTrue(o) {
        return !this.isFalse(o)
    },
    //是否为ios设备
    isIos() {
        var u = navigator.userAgent;
        if (u.indexOf('Android') > -1 || u.indexOf('Linux') > -1) { //安卓手机
            // return "Android";
            return false
        } else if (u.indexOf('iPhone') > -1) { //苹果手机
            // return "iPhone";
            return true
        } else if (u.indexOf('iPad') > -1) { //iPad
            // return "iPad";
            return false
        } else if (u.indexOf('Windows Phone') > -1) { //winphone手机
            // return "Windows Phone";
            return false
        } else {
            return false
        }
    },
    //是否为PC端
    isPC() {
        var userAgentInfo = navigator.userAgent;
        var Agents = ["Android", "iPhone",
            "SymbianOS", "Windows Phone",
            "iPad", "iPod"
        ];
        var flag = true;
        for (var v = 0; v < Agents.length; v++) {
            if (userAgentInfo.indexOf(Agents[v]) > 0) {
                flag = false;
                break;
            }
        }
        return flag;
    },
    //获取浏览器型号
    browserType() {
        var userAgent = navigator.userAgent; //取得浏览器的userAgent字符串
        var isOpera = userAgent.indexOf("Opera") > -1; //判断是否Opera浏览器
        var isIE = userAgent.indexOf("compatible") > -1 && userAgent.indexOf("MSIE") > -1 && !isOpera; //判断是否IE浏览器
        var isIE11 = userAgent.indexOf('Trident') > -1 && userAgent.indexOf("rv:11.0") > -1;
        var isEdge = userAgent.indexOf("Edge") > -1 && !isIE; //判断是否IE的Edge浏览器  
        var isFF = userAgent.indexOf("Firefox") > -1; //判断是否Firefox浏览器
        var isSafari = userAgent.indexOf("Safari") > -1 && userAgent.indexOf("Chrome") == -1; //判断是否Safari浏览器
        var isChrome = userAgent.indexOf("Chrome") > -1 && userAgent.indexOf("Safari") > -1; //判断Chrome浏览器

        if (isIE) {
            var reIE = new RegExp("MSIE (\\d+\\.\\d+);");
            reIE.test(userAgent);
            var fIEVersion = parseFloat(RegExp["$1"]);
            if (fIEVersion == 7) return "IE7"
            else if (fIEVersion == 8) return "IE8";
            else if (fIEVersion == 9) return "IE9";
            else if (fIEVersion == 10) return "IE10";
            else return "IE7以下" //IE版本过低
        }
        if (isIE11) return 'IE11';
        if (isEdge) return "Edge";
        if (isFF) return "FF";
        if (isOpera) return "Opera";
        if (isSafari) return "Safari";
        if (isChrome) return "Chrome";
    }
}