/*
 * @Description: 购物车
 * @Author: Jamboy
 * @Date: 2021-06-05 11:43:59
 * @LastEditTime: 2021-07-12 16:36:57
 */
// pages/cart/cart.js
import { Cart } from '../../models/cart'
import { Calculator } from '../../models/calculator'

const cart = new Cart()

Page({
  /**
   * 页面的初始数据
   */
  data: {
    cartItems: [],
    isEmpty: false,
    allChecked: false,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    cart.getAllCartItemFromServe()
  },

  onShow: function () {
    const cartItems = cart.getAllCartItemFromLocal().items
    console.log('cartItems: ', cartItems)
    if (cart.isEmpty()) {
      this.empty()
      return
    }

    this.setData({
      cartItems,
    })
    this.notEmpty()
    this.isAllChecked()
    this.refreshCartData()
  },

  empty() {
    this.setData({
      isEmpty: true,
    })

    wx.hideTabBarRedDot({
      index: 2,
    })
  },

  notEmpty() {
    this.setData({
      isEmpty: false,
    })

    wx.showTabBarRedDot({
      index: 2,
    })
  },

  isAllChecked() {
    const allChecked = cart.isAllChecked()
    this.setData({
      allChecked,
    })
  },

  onSingleCheck(e) {
    console.log('onSingleCheck: ', e)
    this.isAllChecked()
    this.refreshCartData()
  },

  onDeleteItem(e) {
    const skuId = e.detail
    console.log('skuId: ', skuId)
    this.isAllChecked()
    this.refreshCartData()
  },

  onCountFloat() {
    this.refreshCartData()
  },

  onCheckAll(e) {
    const { checked } = e.detail
    console.log('onCheckAll: ', checked)
    cart.checkAll(checked)
    // const cartItems = cart.getAllCartItemFromLocal().items
    this.setData({
      cartItems: this.data.cartItems,
    })
    this.refreshCartData()
  },

  refreshCartData() {
    const items = cart.getCheckedItems()
    const calculate = new Calculator(items)
    calculate.calc()
    this.setData({
      totalPrice: calculate.getTotalPrice(),
      totalSkuCount: calculate.getTotalSkuCount(),
    })
  },
})
