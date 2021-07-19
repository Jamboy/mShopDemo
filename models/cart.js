/*
 * @Description: 购物车类 单例
 * @Author: Jamboy
 * @Date: 2021-06-17 16:28:25
 * @LastEditTime: 2021-07-12 16:46:51
 */

import {Sku} from '../models/sku'

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

  getAllCartItemFromLocal() {
    return this._getCartData()
  }

  async getAllCartItemFromServe() {
    this
    const cartData = this._getCartData()
    if (cartData.items.length === 0) {
      return null
    }
    const skuIds = this.getSkuIds()
    const serverData = await Sku.getSkuByIds(skuIds)
    this._refreshByServerData(serverData)
    this._refreshStorage()
  }

  _refreshByServerData(serverData) {
    const cartData = this._getCartData()
    cartData.items.forEach((item) => {
      this._setLatestItem(item, serverData)
    })
  }

  _setLatestItem(item, serverData) {
    let removed = true
    for (let sku of serverData) {
      if (sku.id === item.skuId) {
        removed = false
        item.sku = sku
        break
      }
    }
    if (removed) {
      item.sku.online = false
    }
  }

  getSkuIds() {
    const cartData = this._getCartData()
    if (cartData.items.length === 0) {
      return []
    }
    return cartData.items.map((item) => item.skuId)
  }

  getCheckedItems() {
    const cartItems = this._getCartData().items
    const checkedItems = []
    cartItems.forEach((item) => {
      if (item.checked) {
        checkedItems.push(item)
      }
    })
    return checkedItems
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

  alterItem(skuId, count) {
    let oldItem = this.findEqualItem(skuId)
    if (!oldItem) {
      console.error('更新CartItem找不到')
    }
    if (count < 1) {
      console.error('更新数量不能小于0')
    }
    oldItem.count = count
    if (oldItem.count >= Cart.SKU_MAX_COUNT) {
      oldItem.count = Cart.SKU_MAX_COUNT
    }
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

  static isSoldOut(item) {
    return item.sku.stock === 0
  }

  static isOnline(item) {
    return item.sku.online
  }

  checkItem(skuId) {
    const oldItem = this.findEqualItem(skuId)
    oldItem.checked = !oldItem.checked
    this._refreshStorage()
  }

  isAllChecked() {
    const items = this._getCartData().items
    return items.find((item) => item.checked === false) ? false : true
  }

  checkAll(checked) {
    const items = this._getCartData().items
    items.forEach((item) => {
      item.checked = checked
    })
    this._refreshStorage()
  }

  calculateTotal() {
    let total = 0
    const items = this._getCartData().items
    items.forEach((item) => {
      if (item.checked) {
        total += item.count * item.sku.price
      }
    })
    return total
  }
}

export {Cart}
