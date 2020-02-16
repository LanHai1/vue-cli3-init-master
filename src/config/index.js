// 一些全局的config配置
const modeUrlObj = {
  // 生产环境
  'production': {
    baseURL: 'http://xxxx:9091/pro/',
    authBaseURL: ''
  },
  // 开发环境
  'development': {
    baseURL: 'brah_553',
    authBaseURL: ''
  },
  // 测试环境
  'test': {
    baseURL: 'brah_550',
    authBaseURL: ''
  }
}
export default modeUrlObj[process.env.NODE_ENV]
