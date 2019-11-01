/**
 * @param {String} url 地址
 * @description 获取url的queryString参数
 */
export const getQuery = url => {
    var obj = {},
        i,
        num;
    url = url || window.location.href;
    url = url.substr(url.indexOf("?") + 1);
    var arr = url.split("&");
    var len = arr.length;
    for (i = 0; i < len; i++) {
        num = arr[i].indexOf("=");
        if (num > 0) {
            obj[arr[i].substring(0, num)] = arr[i].substr(num + 1);
        }
    }
    return obj;
};
/**
 * //获取当前项目根路径
 * @return {TypeName}
 */
export const getRootPath = () => {
    var pathName = window.location.pathname;
    let default_active;
    if (pathName) {
        let showMenu = pathName.split("/");
        default_active = `/${showMenu[1]}`;
    }
    //获取带"/"的项目名，如：/uimcardprj
    return default_active;
};

/**
 * @param {Number} n n天
 * @description 获取n天前日期
 */
export const chooseDate = n => {
    let myDate = new Date();
    let lw = new Date(myDate - 1000 * 60 * 60 * 24 * n); //最后一个数字n可改，n天的意思
    let lastY = lw.getFullYear();
    let lastM = lw.getMonth() + 1;
    let lastD = lw.getDate();
    let startdate =
        lastY +
        "-" +
        (lastM < 10 ? "0" + lastM : lastM) +
        "-" +
        (lastD < 10 ? "0" + lastD : lastD); //n天之前日期
    return startdate;
};
/**
 * @param {*} val 需验证参数
 * @description 验证是否为数字
 */
export const isRealNum = val => {
    // isNaN()函数 把空串 空格 以及NUll 按照0来处理 所以先去除，
    if (val === "" || val == null) {
        return false;
    }
    if (!isNaN(val)) {
        //对于空数组和只有一个数值成员的数组或全是数字组成的字符串，isNaN返回false，例如：'123'、[]、[2]、['123'],isNaN返回false,
        //所以如果不需要val包含这些特殊情况，则这个判断改写为if(!isNaN(val) && typeof val === 'number' )
        return true;
    } else {
        return false;
    }
};
