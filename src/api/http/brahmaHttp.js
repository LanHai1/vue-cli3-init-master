// 全局参数
import { _get, _postFormData, _post, _put, _delete, _putFormData } from './http.js'

import config from '../../config/index' // 路径配置

// 基地址
let baseURL = config.baseURL;


// 请求拦截器

// 响应拦截器错误
let handleError = err => {
  // if(!err) return
  let res = JSON.parse(err.response.data.message || '{}');
  // need Login
  if (res.data) {
    res.data.forEach(val => {
      // 重新登陆
      if (val.errorMessage === 'exception.system.need_login') {
        // window.localStorage.clear();
        // window.location.reload();
      }
    })
  }
  console.log("ssss",err)
  // 处理遮挡
  //  store.commit('SET_BLOCKED', false);
};


// 响应拦截success
let handleResponseDataBefore = (res,fnRes)=>{
  // store.commit('SET_BLOCKED', false);
  if(fnRes) fnRes(res)
}

export const _getBrah = ({ url, params, fnRes }) => {
  return _get({
    url,
    params,
    baseURL,
    handleResponseData(res){
      handleResponseDataBefore(res,fnRes)
    },
    handleError
  })
};

export const _postFormDataBrah = ({ url, data, fnRes }) => {
  return _postFormData({
    url,
    data,
    baseURL,
    handleResponseData(res){
      handleResponseDataBefore(res,fnRes)
    },
    handleError
  })
};

export const _postBrah = ({ url, data, fnRes }) => {
  return _post({
    url,
    data,
    baseURL,
    handleResponseData(res){
      handleResponseDataBefore(res,fnRes)
    },
    handleError,
  })
};

export const _putBrah = ({ url, data, fnRes }) => {
  return _put({
    url,
    data,
    baseURL,
    handleResponseData(res){
      handleResponseDataBefore(res,fnRes)
    },
    handleError
  })
};

export const _deleteBrah = ({ url, fnRes }) => {
  return _delete({
    url,
    baseURL,
    handleResponseData: fnRes,
    handleError
  })
};

export const _putFormDataBrah = ({ url, data, fnRes }) => {
  return _putFormData({
    url,
    data,
    baseURL,
    handleResponseData: fnRes,
    handleError
  })
};