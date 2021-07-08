/*
 * @Description:
 * @Author: Jamboy
 * @Date: 2021-02-01 11:58:53
 * @LastEditTime: 2021-06-29 14:09:50
 */
import { Token } from './models/token'
import { Cart } from './models/cart'

// app.js
App({
  onLaunch() {
    // const token = new Token();
    // token.verify()

    // 购物车红点
    const cart = new Cart()
    if (!cart.isEmpty()) {
      wx.showTabBarRedDot({
        index: 2,
      })
    }
  },
})
