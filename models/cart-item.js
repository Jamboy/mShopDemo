/*
 * @Description: 购物车单项商品
 * @Author: Jamboy
 * @Date: 2021-06-17 16:38:36
 * @LastEditTime: 2021-06-17 16:41:01
 */

class CartItem {
  skuId = null
  count = 0
  sku = null
  checked = true

  constructor(sku, count) {
    this.skuId = sku.id
    this.sku = sku
    this.count = count
  }
}

export { CartItem }
