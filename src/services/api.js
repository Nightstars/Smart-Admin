//跨域代理前缀
// const API_PROXY_PREFIX='/api'
// const BASE_URL = process.env.NODE_ENV === 'production' ? process.env.VUE_APP_API_BASE_URL : API_PROXY_PREFIX
const BASE_URL = process.env.VUE_APP_API_BASE_URL
module.exports = {
  LOGIN: `${BASE_URL}/api/identity/Login`, //登陆地址
  ROUTES: `${BASE_URL}/routes`,
  APPS: `${BASE_URL}/api/MyApps`,//我的应用
  FINANCE_GROUP: `${BASE_URL}/api/FinanceGroup`, //金融分组
  FINANCE_APP: `${BASE_URL}/api/FinanceApp`, //金融应用
}
