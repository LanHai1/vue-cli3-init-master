import axios from 'axios';
// 请求方式
const METHOD = {
    GET: 'GET',
    POST: 'POST',
    PUT: 'PUT',
    DELETE: 'DELETE',
    HEAD: 'HEAD',
    PATCH: 'PATCH',
    OPTIONS: 'OPTIONS'
};

// content-type
const CONTENT_TYPE = {
    NAME: 'Content-Type',
    JSON: 'application/json;charset=UTF-8',
    FORM_DATA: 'multipart/form-data'
};

// 配置
const CONFIG = {
    BASE_URL: '/'
};

const BASE = {
    send(obj:any) {
        // 判断响应码是否正常，默认的
        const isOkResponse = (status: any )=> {
            return status >= 200 && status < 300;
        };

        axios.request({
            url: obj.url,
            // 默认是get
            method: obj.method || METHOD.GET,
            baseURL: obj.baseURL || CONFIG.BASE_URL,
            headers: obj.headers,
            params: obj.params,
            data: obj.data,
            // 默认10000
            timeout: obj.timeout || 10000,
            // 默认json
            responseType: obj.responseType || 'json',
            // 上传事件
            onUploadProgress: obj.onUploadProgress || function (progressEvent) {
                // 默认上传进度事件，可定义全局进度条
                console.log('上传进度事件', progressEvent);
            },
            // 定义可获得的http响应状态码
            validateStatus: obj.validateStatus || function (status) {
                return isOkResponse(status);
            }
        }).then((response) => {
            // 处理响应头和响应数据
            const handleResponse = (res: any, obj: any) => {
                if (obj.handleResponse) {
                    obj.handleResponse(res);
                }
                if (obj.handleResponseHeaders) {
                    obj.handleResponseHeaders(res.headers);
                }
                if (obj.handleResponseData) {
                    obj.handleResponseData(res.data);
                }
            };

            // 验证响应数据是否有效,全局验证
            const validateResponse = (data: any) => {
                console.log(data)
                return true;
            };

            // 处理非正常业务数据
            const handleErrorResponse = (res: any, obj: any) => {
                if (obj.handleErrorResponse) {
                    obj.handleErrorResponse(res);
                }
                if (obj.handleResponseHeaders) {
                    obj.handleResponseHeaders(res.headers);
                }
                if (obj.handleErrorResponseData) {
                    obj.handleErrorResponseData(res);
                }
            };

            // 处理非正常业务数据
            const handleErrorData = (data: any) => {
                //可以自行定义弹框或提醒
                console.log(data);
            };

            // 开始处理响应数据
            if (validateResponse(response)) {
                // 自定义响应数据验证器
                if (obj.validateResponse) {
                    if (obj.validateResponse(response)) {
                        // 能调用这个方法，说明业务数据一定正确
                        handleResponse(response, obj);
                    } else {
                        // 说明是非正常业务数据，比如响应code返回非正常状态
                        // 如果有自定义处理非正常业务数据，就调用自定义处理器，否则调用全局处理器
                        if (obj.handleErrorResponse || obj.handleErrorResponseData) {
                            handleErrorResponse(response, obj);
                        } else {
                            // 调用全局处理非正常业务数据
                            handleErrorData(response.data);
                        }
                    }
                } else {
                    // 能调用这个方法，说明业务数据一定正确
                    handleResponse(response, obj);
                }
            }
        }).catch(function (error) {
            // 默认全局处理error的方式
            function handleError(error: any) {
                // 可以自行定义弹框或提醒
                console.log(error);
            }

            // 如果有自定义异常处理器，就调用自定义的处理器，否则调用全局处理器
            if (obj.handleError) {
                obj.handleError(error);
            } else {
                handleError(error);
            }
        });
    }
};

// 抽离公共的参数
function defaultHandleConfig(obj: any) {
    return {
        url: obj.url,
        baseURL: obj.baseURL,
        headers: obj.headers,
        responseType: obj.responseType,
        // 响应状态验证器
        validateStatus: obj.validateStatus,
        // 响应数据验证器
        validateResponse: obj.validateResponse,
        handleResponse: obj.handleResponse,
        // 处理响应头(正常业务数据)
        handleResponseHeaders: obj.handleResponseHeaders,
        // 处理响应数据(正常业务数据)
        handleResponseData: obj.handleResponseData,
        // 处理非正常响应数据(不符合validateResponseData的数据)
        handleErrorResponse: obj.handleErrorResponse,
        // 处理非正常响应数据(不符合validateResponseData的数据)
        handleErrorResponseData: obj.handleErrorResponseData,
        // 处理异常情况,不定义会调用全局处理器
        handleError: obj.handleError
    }
}

// 设置headers
function addHeader(headers: any, key: any, value: any) {
    if (!headers) {
        headers = {};
    }
    headers[key] = value;
    return headers;
}

// 将data转换为json包装
const handleData2Json = (data: any) => {
    if (data) {
        return JSON.stringify(data);
    }
    return data;
};

// 将data转换为FormData包装
const handleData2FormData = (data: any) => {
    // 判断是不是文件
    const isFile = (file: any) => file instanceof File;

    // 创建一个FormData，用来包装数据
    const formData = new FormData();
    if (data) {
        // 抽出data的所有属性和值，放进FormData中
        for (const attr in data) {
            const value = data[attr];
            if (isFile(value)) {
                formData.append(attr, value);
            } else if (typeof value === 'object') {
                // 针对{}，[]类型，要使用Blob包装
                formData.append(attr, new Blob([JSON.stringify(value)], { type: CONTENT_TYPE.JSON }));
            } else {
                formData.append(attr, value);
            }
        }
    }
    return formData;
};

// 对应所有get请求
const _get = (obj: any) => {
    const config:any = defaultHandleConfig(obj);
    config.params = obj.params;
    BASE.send(config);
};

// 对应spring mvc中的@RequestPart，支持文件上传
const _postFormData = (obj: any) => {
    const config: any = defaultHandleConfig(obj);
    config.method = METHOD.POST;
    config.headers = addHeader(obj.headers, CONTENT_TYPE.NAME, CONTENT_TYPE.FORM_DATA);
    config.data = handleData2FormData(obj.data);
    config.onUploadProgress = obj.onUploadProgress;
    BASE.send(config);
};

// 对应spring mvc中的@RequestBody
const _post = (obj: any) => {
    const config: any = defaultHandleConfig(obj);
    config.method = METHOD.POST;
    config.headers = addHeader(obj.headers, CONTENT_TYPE.NAME, CONTENT_TYPE.JSON);
    config.data = handleData2Json(obj.data);
    BASE.send(config);

};

const _putFormData = (obj: any) => {
    const config: any = defaultHandleConfig(obj);
    config.method = METHOD.PUT;
    config.headers = addHeader(obj.headers, CONTENT_TYPE.NAME, CONTENT_TYPE.FORM_DATA);
    config.data = handleData2FormData(obj.data);
    config.onUploadProgress = obj.onUploadProgress;
    BASE.send(config);
}

// 和post一样，不过要保持幂等
const _put = (obj: any) => {
    const config: any = defaultHandleConfig(obj);
    config.method = METHOD.PUT;
    config.headers = addHeader(obj.headers, CONTENT_TYPE.NAME, CONTENT_TYPE.JSON);
    config.data = handleData2Json(obj.data);
    BASE.send(config);
};

// 删除
const _delete = (obj: any) => {
    const config: any = defaultHandleConfig(obj);
    config.method = METHOD.DELETE;
    config.params = obj.params;
    BASE.send(config);
};

// 向外暴露
export { _get, _postFormData, _post, _putFormData, _put, _delete }