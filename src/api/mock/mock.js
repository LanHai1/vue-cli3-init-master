// 加载mockjs库
import Mock from 'mockjs'
// 构建一个函数对象，返回mock数据
const mockData = function () {
    let data = 1;
    // 此处省略对data的一系列运算
    return {
        data: data
    }
}
// url是真实的url，第二个参数是post和get都管，第三个参数就是传入函数对象
Mock.mock('/mock/test', /post|get/i, mockData);