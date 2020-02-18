/**
 * 获取el对象的浏览器绝对位置
 * @param el
 * @returns {{top: number, left: number}}
 */
function getElPos(el) {
    let pos = {
        top: 0,
        left: 0
    }
    if (el.offsetParent) {
        while (el.offsetParent) {
            pos.top += el.offsetTop
            pos.left += el.offsetLeft
            el = el.offsetParent
        }
    } else if (el.x) {
        pos.left += el.x
    } else if (el.y) {
        pos.top += el.y
    }
    return pos
}

export {
    getElPos
}

/**
 * 格式化千分位
 * @param value
 * @returns {string}
 */
function formatThousandth(value) {
    if (value === undefined || value === null) {
        return value
    }
    let tmpVal = value.toString()
    let decimal = ''
    if (tmpVal.includes('.')) {
        decimal = tmpVal.substring(tmpVal.indexOf('.'))
        tmpVal = tmpVal.substring(0, tmpVal.indexOf('.'))
    }
    return tmpVal.replace(/(\d)(?=(?:\d{3})+$)/g, '$1,') + decimal
}

export {
    formatThousandth
}
