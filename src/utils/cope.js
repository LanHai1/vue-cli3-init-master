import type from "./type.js"
import {
    Notification
} from 'element-ui';

export const cope = txt => {
    let textArea;
    // 判断是否为ios端
    // let isIos1 = () => {
    //     let u = navigator.userAgent;
    //     if (u.indexOf('Android') > -1 || u.indexOf('Linux') > -1) { //安卓手机
    //         // return "Android";
    //         return false
    //     } else if (u.indexOf('iPhone') > -1) { //苹果手机
    //         // return "iPhone";
    //         return true
    //     } else if (u.indexOf('iPad') > -1) { //iPad
    //         // return "iPad";
    //         return false
    //     } else if (u.indexOf('Windows Phone') > -1) { //winphone手机
    //         // return "Windows Phone";
    //         return false
    //     } else {
    //         return false
    //     }
    // }

    // 创建文本元素
    let createTextArea = text => {
        textArea = document.createElement('textArea');
        textArea.value = text;
        document.body.appendChild(textArea);
    }

    // 选择内容
    let selectText = () => {
        var range,
            selection;

        if (type.isIos()) {
            range = document.createRange();
            range.selectNodeContents(textArea);
            selection = window.getSelection();
            selection.removeAllRanges();
            selection.addRange(range);
            textArea.setSelectionRange(0, 999999);
        } else {
            textArea.select();
        }
    }

    // 复制到剪贴板
    let copyToClipboard = () => {
        try {
            if (document.execCommand("Copy")) {
                Notification({
                    title: '成功',
                    message: '复制成功！',
                    type: 'success',
                    duration: "1000"
                });
            } else {
                Notification({
                    title: '失败',
                    message: '复制失败！请手动复制！',
                    type: 'error',
                    duration: "1000"
                });
            }
        } catch (err) {
            Notification({
                title: '失败',
                message: '复制失败！请手动复制！',
                type: 'error',
                duration: "1000"
            });
        }
        document.body.removeChild(textArea);
    }

    createTextArea(txt);
    selectText();
    copyToClipboard();
}