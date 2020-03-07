// 一些全局的config配置
const modeUrlObj: any = {
  // 生产环境
  'production': {
    baseURL: '',
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
