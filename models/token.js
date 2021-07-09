/*
 * @Description: 登录 By wx -获取Token
 * @Author: Jamboy
 * @Date: 2021-02-22 17:12:45
 * @LastEditTime: 2021-07-09 15:04:54
 */

import { config } from '../config/config'
import { Http } from '../utils/http'
import { promisic } from '../utils/util'

class Token {
  /**
   * @description: 验证token
   * @param {*}
   * @return {*}
   */

  constructor() {
    this.tokenUrl = config.apiBaseUrl + 'token'
    this.verifyUrl = config.apiBaseUrl + 'token/verify'
  }

  async verify() {
    const token = wx.getStorageSync('token')
    if (!token) {
      // 缓存token不存在从服务器获取
      await this.getTokenFromServer()
    } else {
      // token存在验证是否有效，有效则跳转主界面，无效进登录界面
      const res = await this._verifyFromServer(token)
      console.log('res: ', res);
    }
  }

  async getTokenFromServer() {
    const r = await wx.login()
    console.log('r: ', r)
    const { code } = r
    const res = await promisic(wx.request)({
      url: this.tokenUrl,
      method: 'POST',
      data: {
        account: code,
        type: 0,
      },
    })
    console.log('getTokenFromServer: ', res)
    const { token } = res.data
    wx.setStorageSync('token', token)
    return token
  }

  async _verifyFromServer(token) {
    const res = await promisic(wx.request)({
      url: this.verifyUrl,
      method: 'POST',
      data: {
        token,
      },
    })

    const { is_valid: valid } = res.data
    console.log('valid: ', valid);
    if (!valid) {
      return this.getTokenFromServer()
    }
    return valid
  }
}

export { Token }
