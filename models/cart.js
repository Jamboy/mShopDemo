/*
 * @Description: 购物车类 单例
 * @Author: Jamboy
 * @Date: 2021-06-17 16:28:25
 * @LastEditTime: 2021-06-29 10:43:39
 */

class Cart {
  static SKU_MIN_COUNT = 1 // 最小
  static SKU_MAX_COUNT = 77 //单个商品最多买多少个
  static CART_ITEM_MAX_COUNT = 99 //购物车最多添加商品
  static STORAGE_KEY = 'cart' //购物车最多添加商品
  _cartData = null

  // 代理模式

  constructor() {
    if (typeof Cart.instance === 'object') {
      return Cart.instance
    }
    Cart.instance = this
    return this
  }

  getALlCartItemFromLocal() {
    return this._getCartData()
  }

  isEmpty() {
    const cartData = this._getCartData()
    return cartData.items.length === 0
  }

  /**
   * @description: 添加cart-item
   * @param {*} newItem
   * @return {*}
   */
  addItem(newItem) {
    if (this.beyondCartItemCount()) {
      throw new Error('超过购物车最大数量')
    }
    this._pushItem(newItem)
    this._refreshStorage()
  }

  removeItem(skuId) {
    const oldItemIndex = this._findEqualItemIndex(skuId)
    const cartData = this._getCartData()
    cartData.items.splice(oldItemIndex, 1)
    this._refreshStorage()
  }

  _refreshStorage() {
    wx.setStorageSync(Cart.STORAGE_KEY, this._cartData)
  }

  // 购物车子项添加
  _pushItem(newItem) {
    const cartData = this._getCartData()
    const oldItem = this.findEqualItem(newItem.skuId)
    if (!oldItem) {
      cartData.items.unshift(newItem)
    } else {
      this._combineItems(oldItem, newItem)
    }
  }

  findEqualItem(skuId) {
    let oldItem = null
    const items = this._getCartData().items
    for (let i = 0; i < items.length; i++) {
      if (this._isEqualItem(items[i], skuId)) {
        oldItem = items[i]
        break
      }
    }
    return oldItem
  }

  _findEqualItemIndex(skuId) {
    const cartData = this._getCartData()
    return cartData.items.findIndex((item) => {
      return item.skuId === skuId
    })
  }

  _isEqualItem(item, skuId) {
    return item.skuId === skuId
  }

  _combineItems(oldItem, newItem) {
    this._plusItem(oldItem, newItem.count)
  }

  _plusItem(item, count) {
    item.count += count
    if (item.count >= Cart.SKU_MAX_COUNT) {
      item.count = Cart.SKU_MAX_COUNT
    }
  }

  /**
   * @description: 判断购物车种类数量是否超出最大值
   * @return {*}
   */
  beyondCartItemCount() {
    const cartData = this._getCartData()
    return cartData.items.length >= Cart.CART_ITEM_MAX_COUNT
  }

  // 获取购物车缓存
  _getCartData() {
    if (this._cartData !== null) {
      return this._cartData
    }
    let cartData = wx.getStorageSync(Cart.STORAGE_KEY)
    if (!cartData) {
      cartData = this._initCartDataStorage()
    }
    this._cartData = cartData
    return cartData
  }

  // 初始化购车车缓存
  _initCartDataStorage() {
    const cartData = {
      items: [],
    }
    wx.setStorageSync(Cart.STORAGE_KEY, cartData)
    return cartData
  }
}

export { Cart }
