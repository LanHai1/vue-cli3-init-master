// 加载mockjs库
import Mock from 'mockjs'

// 用来获取get请求的参数
let GetUrlParam = (url, paraName) => {
    let arrObj = url.split("?");
    if (arrObj.length > 1) {
        let arrPara = arrObj[1].split("&");
        let arr;
        for (let i = 0; i < arrPara.length; i++) {
            arr = arrPara[i].split("=");
            if (arr != null && arr[0] == paraName) {
                return decodeURI(arr[1]);
            }
        }
        return "";
    } else {
        return "";
    }
}

// 构建一个函数对象，返回mock数据
const mockData = (options) => {
    let data = 1;
    // 此处省略对data的一系列运算
    console.log(options, GetUrlParam(options.url, "name"), GetUrlParam(options.url, "password"))
    return {
        data: data
    }
}
// url是真实的url，第二个参数是post和get都管，第三个参数就是传入函数对象
Mock.mock(RegExp('/mock/test' + ".*"), /post|get/i, mockData);

// 登陆
Mock.mock(RegExp('/mock/login' + ".*"), /get/i, (option) => {
    let username = GetUrlParam(option.url, "username");
    let password = GetUrlParam(option.url, "password");
    if (password !== "123456") {
        return {
            msg: "用户名或密码错误",
            code: "500",
            user: null
        }
    }
    // 管理员登陆
    if (username === "admin") {
        return {
            msg: "登陆成功，欢迎您！",
            code: "200",
            user: {
                name: "管理员",
                id: "0"
            }
        }
    }
    // 普通用户登陆
    return {
        msg: "登陆成功，欢迎您！",
        code: "200",
        user: {
            name: "用户1",
            id: "1"
        }
    }
})