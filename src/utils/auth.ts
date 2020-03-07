import Cookies from "js-cookie";

const TokenKey = 'Authorization'
/*
* 设置setLocalStorage
* */
export function setLocalStorage(key: string, value: string) {
    window.localStorage.setItem(key, window.JSON.stringify(value))
}
/*
* 获取getLocalStorage
* */
export function getLocalStorage(key: string) {
    return window.localStorage.getItem(key)
}
/*
* 设置setSessionStorage
* */
export function setSessionStorage(key: string, value: string) {
    window.sessionStorage.setItem(key, window.JSON.stringify(value))
}
/*
* 获取getSessionStorage
* */
export function getSessionStorage(key: string) {
    return window.JSON.parse(window.sessionStorage.getItem(key) || '[]')
}
/*
* 获取getToken
* */
export function getToken() {
    return Cookies.get(TokenKey)
}
/*
* 设置setToken
* */
export function setToken(token: string) {
    return Cookies.set(TokenKey, token)
}
/*
* 移除removeToken
* */
export function removeToken() {
    return Cookies.remove(TokenKey)
}
