// 验证密码
export const validatePass = (str: string): boolean => {
    return /^.{6,}$/.test(str.trim());
};
// 验证中文
export const validateCN = (str: string): boolean => {
    return /^[\u4E00-\u9FA5\uF900-\uFA2D]+$/.test(str.trim());
}
// 验证用户名
export const validateName = (str: string): boolean => {
    return /^[_0-9a-zA-Z]{6,18}$/.test(str.trim());
}
// 验证手机号
export const validatePhoneNb = (str: string): boolean => {
    const reg1 = /(^1(3[4-9]|4[7]|5[0-27-9]|7[8]|8[2-478])\d{8}$)|(^1705\d{7}$)/;
    const reg2 = /(^1(3[0-2]|4[5]|5[56]|6[6]|7[6]|8[56])\d{8}$)|(^1709\d{7}$)/;
    const reg3 = /(^1(33|53|77|75|8[019])\d{8}$)|(^1700\d{7}$)/;
    str = str + "";
    return (reg1.test(str.trim()) || reg2.test(str.trim()) || reg3.test(str.trim()));
}
// 验证身份证
export const validateIdCard = (str: string): boolean => {
    return /^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/.test(str.trim());
}
// 验证车牌
export const validatePlateNb = (str: string): boolean => {
    return /^[京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领A-Z]{1}[A-Z]{1}[A-Z0-9]{4}[A-Z0-9挂学警港澳]{1}$/.test(str.trim());
}