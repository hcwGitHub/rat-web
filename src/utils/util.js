//多个方法在此处json中export出去
export {
    requestPath, //获取请求路径
    requestPathOld, //获取请求路径
    setCookie, //设置cookie
    getCookie, //获取cookie
    delCookie, //删除cookie
    getCom, //获取公共参数
    getFirstCharacter,//取字符串的第一个字符
    mytrim, //去除前后空格
    getDiffYear,//获取从2019/11/1到今天的 “年份列表”
    getDate,
    getGuid,
}
// 新系统------>
let ipPath = 'localhost:8080';       //本地
// let ipPath = 'git.iman.io';  // uat
// let ipPath = 'oc.mobility.chunwo.com';  //api live Server

// let ipPath = 'cms4k.anyplex.com';       //live
// 新系统------> END

// 旧系统------>
// let ipPathOld = 'localhost:8081';        //本地
// let ipPathOld = 'm-uat.anyplex.com';   //uat
let ipPathOld = 'm.anyplex.com';       //live
// 旧系统------> END

// 旧系统/原项目地址
let oldApiPath = 'http://dev.hkdwss.com/api/v3';  // dev

//获取请求路径
function requestPath() {
    return 'http://' + ipPath + '/api/';  // 本地
    // return 'https://' + ipPath + '/api/';  // live
    // return ipPath + '/api/';
}

// 俊和旧项目path
// function requestOldPath() {
//    return oldApiPath;
// }

//获取旧系统请求路径
function requestPathOld() {
    return 'https://' + ipPathOld + '/api/';
}

/**
 * 获取url参数
 */
function getQuery() {
    var uId = location.search;//?id=3&ab=3&cd=4
    var obj = {};
    //以&为分界切割
    var arr = uId.slice(1, uId.length).split('&');//["id=3", "ab=3", "cd=4"]
    //遍历数组
    arr.forEach(function (val) {
        //切割=两边的数据
        var arr1 = val.split('=');
        obj[arr1[0]] = decodeURI(arr1[1]);
    });
    return obj
}

/**
 * 设置cookie
 * 固定30天
 * @param name 属性名
 * @param value 值
 */
function setCookie(name, value) {
    var days = 30;
    var date = new Date();
    date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
    var expires = "; expires=" + date.toGMTString();
    document.cookie = name + "=" + value + expires + "; path=/";
}

/**
 * 获取cookie
 */
function getCookie(name) {
    var nameEQ = name + "=";
    var ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) === ' ') c = c.substring(1, c.length);
        if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
    }
    return null;
}

/**
 * 清除cookie
 */
function delCookie(name) {
    var days = 0;
    var date = new Date();
    date.setTime(date.getTime() + days);
    var expires = "; expires=" + date.toGMTString();

    document.cookie = name + "=" + expires + "; path=/";
}


/**
 * 获取公共参数
 * @return com 公共参数对象
 * */
function getCom() {
    let com = {
        //公共参数
        device_id: getDevice_id(),
        language: "zh_HK",
    };
    return com;
}

/**
 * 获取浏览器唯一标识
 * @return device_id
 * */
function getDevice_id() {
    let res = getCookie('device_id');
    if (res !== undefined && res !== null && res !== '') {
        //cookies存在device_id ，返回res
        return res;
    } else {
        //cookies不存在device_id
        res = getUuid();
        setCookie('device_id', res);
        return res;
    }
}

/**
 * 生成36位固定设备号
 * @return device_id
 * */
function getUuid() {
    let s = [];
    let hexDigits = "0123456789abcdef";
    for (let i = 0; i < 36; i++) {
        s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1);
    }
    s[14] = "4";  // bits 12-15 of the time_hi_and_version field to 0010
    s[19] = hexDigits.substr((s[19] & 0x3) | 0x8, 1);  // bits 6-7 of the clock_seq_hi_and_reserved to 01
    s[8] = s[13] = s[18] = s[23] = "-";
    let uuid = s.join("");
    return uuid;
}

/**
 *  拷貝url、文字
 *  @param data
 * */
function copyUrl(data) {
    let url = data;
    let oInput = document.createElement('input');
    oInput.value = url;
    document.body.appendChild(oInput);
    oInput.select(); // 选择对象;
    console.log(oInput.value);
    document.execCommand("Copy"); // 执行浏览器复制命令
    this.$message({
        message: '已成功复制到剪切板',
        type: 'success'
    });
    oInput.remove()
}

/**
 * 去除前後空格
 * */
function mytrim(str) {
    if (str !== null)
        return str.replace(/(^\s*)|(\s*$)/g, "");
}

// function close(){
//   window.opener=null;
//   window.open('','_self');
//   window.close();
// }


/**
 * 获取从2019/11/1到今天的 “日期列表”
 * @param dateString 例如: "2019/8/1"
 * @returns {Array} 日期列表
 */
function getDiffDate(dateString) {
    var startTime = getDate(dateString);
    var endTime = getDate(new Date(new Date().getTime() + 24 * 60 * 60 * 1000).toLocaleDateString());
    var dateArr = [];
    while ((endTime.getTime() - startTime.getTime()) > 0) {
        var year = startTime.getFullYear();
        // var month = startTime.getMonth().toString().length === 1 ? "0" + (parseInt(startTime.getMonth().toString(), 10) + 1) : (startTime.getMonth() + 1);
        var month = startTime.getMonth() < 9 ? "0" + (parseInt(startTime.getMonth().toString(), 10) + 1) : (startTime.getMonth() + 1);
        var day = startTime.getDate().toString().length === 1 ? "0" + startTime.getDate() : startTime.getDate();
        // dateArr.push(year + "-" + month + "-" + day);  //在尾部添加元素
        dateArr.unshift(year + "-" + month + "-" + day);  //在头部添加元素
        startTime.setDate(startTime.getDate() + 1);
    }
    return dateArr;
}

/**
 * 获取从2019/11/1到今天的 “月份列表”
 * @param dateString 例如: "2019/8/1"
 * @returns {Array} 月份列表
 */
function getDiffMonth(dateString) {
    var startTime = getDate(dateString);
    var endTime = getDate(new Date(new Date().getTime() + 24 * 60 * 60 * 1000).toLocaleDateString());
    var dateArr = [];
    while ((endTime.getTime() - startTime.getTime()) > 0) {
        var year = startTime.getFullYear();
        // var month = startTime.getMonth().toString().length === 1 ? "0" + (parseInt(startTime.getMonth().toString(), 10) + 1) : (startTime.getMonth() + 1);
        var month = startTime.getMonth() < 9 ? "0" + (parseInt(startTime.getMonth().toString(), 10) + 1) : (startTime.getMonth() + 1);
        var day = startTime.getDate().toString().length === 1 ? "0" + startTime.getDate() : startTime.getDate();
        // dateArr.push(year + "-" + month);  //在尾部添加元素
        dateArr.unshift(year + "-" + month);  //在头部添加元素
        startTime.setMonth(startTime.getMonth() + 1);
    }
    return dateArr;
}

/**
 * 获取从2019/11/1到今天的 “年份列表”
 * @param dateString 例如: "2019/8/1"
 * @returns {Array} 月份列表
 */
function getDiffYear(dateString) {
    var startTime = getDate(dateString);
    var endTime = getDate(new Date(new Date().getTime() + 24 * 60 * 60 * 1000).toLocaleDateString());
    var dateArr = [];
    while ((endTime.getTime() - startTime.getTime()) > 0) {
        var year = startTime.getFullYear();
        // dateArr.push(year);  //在尾部添加元素
        dateArr.unshift(year);  //在头部添加元素
        startTime.setFullYear(startTime.getFullYear() + 1);
    }
    return dateArr;
}

function getDate(datestr) {
    var temp = datestr.split("/");
    if (temp[1] === '01') {
        temp[0] = parseInt(temp[0], 10) - 1;
        temp[1] = '12';
    } else {
        temp[1] = parseInt(temp[1], 10) - 1;
    }
    //new Date()的月份入参实际都是当前值-1
    var date = new Date(temp[0], temp[1], temp[2]);
    return date;
}

/**
 * 获取字符串的第一个字符
 * @param string
 * @returns {*}
 */
function getFirstCharacter(str) {
    if (str !== null)
        return str.slice(0, 1)
}

//用于生成uuid
function S4() {
    return (((1+Math.random())*0x10000)|0).toString(16).substring(1);
}
function getGuid() {
    return (S4()+S4()+"-"+S4()+"-"+S4()+"-"+S4()+"-"+S4()+S4()+S4());
}
