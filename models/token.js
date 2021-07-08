/*
 * @Description: 登录操作/帐号密码&By wx -获取Token
 * @Author: Jamboy
 * @Date: 2021-02-22 17:12:45
 * @LastEditTime: 2021-06-17 11:59:35
 */

import { config } from '../config/config'
import { Http } from '../utils/http'
import { promisic } from '../utils/util'

class Token {
  /**
   * @description: 验证用户是否登录且token有效
   * @param {*}
   * @return {*}
   */
  async verify() {
    const token = wx.getStorageSync('token')
    if (!token) {
      console.log('进入验证缓存token未存在暂不做操作')
      // 缓存token不存在从服务器获取——跳转登录界面
      // this.getTokenFromServiceByAccount();
    } else {
      // console.log('本地token:' + token);
      // token存在验证是否有效，有效则跳转主界面，无效进登录界面
      const res = await this._verifyTokenFromService(token)
      console.log('验证结果' + res.code)
      if (res.code === 200) {
        wx.reLaunch({
          url: '/pages/my/my',
        })
      } else {
        wx.showToast({
          title: 'token失效,请重新登录',
          icon: 'none',
          duration: 3000,
        })
      }
    }
  }

  /**
   * @description: 使用帐号密码从服务器获取Token-登录
   * @param {*}
   * @return {*}
   */
  static async getTokenFromServiceByAccount(username, password) {
    const res = await Http.request({
      url: 'admin/acl/login',
      data: {
        username,
        password,
      },
      method: 'POST',
    })
    wx.setStorageSync('token', res.data.token)
    return res.data.token
  }

  /**
   * @description: 验证当前token是否可用
   * @param {*} token
   * @return {*}
   */
  async _verifyTokenFromService(token) {
    console.log(token)
    const res = await promisic(wx.request)({
      url: `${config.ApiBaseUrl}admin/acl/info`,
      header: {
        GDDZ_DRP_TOKEN: token,
      },
    })
    return res.data
  }
}

export { Token }
