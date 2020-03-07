// 全局参数
import { _get, _postFormData, _post, _put, _delete, _putFormData } from './httsNew'

import config from '../../config/index' // 路径配置

// 基地址
const baseURL = config.baseURL;


// 请求拦截器

// 响应拦截器错误
const handleError = (err: any) => {
    // if(!err) return
    // const res: any = JSON.parse(err.response.data.message || '{}');
    // // need Login
    // if (res.data) {
    //     res.data.forEach((val: any) => {
    //         // 重新登陆
    //         if (val.errorMessage === 'exception.system.need_login') {
    //             // window.localStorage.clear();
    //             // window.location.reload();
    //         }
    //     })
    // }
    console.log("ssss", err)
    //  处理遮挡
    //  store.commit('SET_BLOCKED', false);
};


// 响应拦截success
const handleResponseDataBefore = (res: any, fnRes: any) => {
    // store.commit('SET_BLOCKED', false);
    if (fnRes) fnRes(res)
}

export const _getBrah = (obj: any) => {
    const { url, params, fnRes } = obj;
    return _get({
        url,
        params,
        baseURL,
        handleResponseData(res: any) {
            handleResponseDataBefore(res, fnRes)
        },
        handleError
    })
};

export const _postFormDataBrah = (obj: any) => {
    const { url, data, fnRes } = obj;
    return _postFormData({
        url,
        data,
        baseURL,
        handleResponseData(res: any) {
            handleResponseDataBefore(res, fnRes)
        },
        handleError
    })
};

export const _postBrah = (obj: any) => {
    const { url, data, fnRes } = obj;
    return _post({
        url,
        data,
        baseURL,
        handleResponseData(res: any) {
            handleResponseDataBefore(res, fnRes)
        },
        handleError,
    })
};

export const _putBrah = (obj: any) => {
    const { url, data, fnRes } = obj;
    return _put({
        url,
        data,
        baseURL,
        handleResponseData(res: any) {
            handleResponseDataBefore(res, fnRes)
        },
        handleError
    })
};

export const _deleteBrah = (obj: any) => {
    const { url, fnRes } = obj
    return _delete({
        url,
        baseURL,
        handleResponseData: fnRes,
        handleError
    })
};

export const _putFormDataBrah = (obj: any) => {
    const { url, data, fnRes } = obj
    return _putFormData({
        url,
        data,
        baseURL,
        handleResponseData: fnRes,
        handleError
    })
};