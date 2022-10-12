import request from '@/utils/request'
/**
 * 账号登录
 * @param {string} account 用户名
 * @param {string} password 密码
 * @returns Promise
 */
export const userAccountLogin = ({ account, password }) => {
  return request('/login', 'post', { account, password })
}

/**
 * 手机号登录
 * @param {number} mobile 手机号
 * @param {string} code 验证码
 * @return Promise
 */
export const userMobileLogin = ({ mobile, code }) => {
  return request('/login/code', 'post', { mobile, code })
}

/**
 * 获取验证码
 * @param {*} mobile 手机号
 * @returns Promise
 */
export const userMobileLoginCode = (mobile) => {
  return request('/login/code', 'get', { mobile })
}