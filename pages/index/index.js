/*
 * @Description: 
 * @Author: Jamboy
 * @Date: 2021-07-08 16:17:03
 * @LastEditTime: 2021-07-12 09:19:05
 */
// var crpto = require('../../utils/cypto.js');
// import {decrypted} from '../../utils/cypto.js';
// import {cryptoJs} from '../../utils/crypto.js'
import cryptoJs from '../../utils/crypto.js'

// index.js
// 获取应用实例
const app = getApp()

Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
  },
  // 事件处理函数
  bindViewTap() {
    wx.navigateTo({
      url: '../logs/logs',
    })
  },

  onLoad() {
    const encryptPas = cryptoJs.encrypt('admin')
    const decryptMd5 = cryptoJs.md5('123456')
    const aes = cryptoJs.encrypt(decryptMd5)

    console.log('aes加密:' + encryptPas)
    // console.log("aes解密:" + decryptPas);
    // console.log("md5加密:" + decryptMd5);
    console.log('md5-aes加密:' + aes)

    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true,
      })
    } else if (this.data.canIUse) {
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = (res) => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true,
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: (res) => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true,
          })
        },
      })
    }
  },

  
  getUserInfo(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true,
    })
  },
})
