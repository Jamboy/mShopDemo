/*
 * @Description:
 * @Author: Jamboy
 * @Date: 2021-07-08 16:17:03
 * @LastEditTime: 2021-07-12 15:11:33
 */
// components/cart-item/index.js
import { parseSpecValue } from '../../utils/sku'
import { Cart } from '../../models/cart'
const cart = new Cart()

Component({
  /**
   * 组件的属性列表
   */
  properties: {
    cartItem: Object,
  },

  data: {
    specStr: String,
    discount: Boolean,
    soldOut: Boolean,
    online: Boolean,
    stock: Cart.SKU_MAX_COUNT,
    skuCount: 1,
  },

  observers: {
    cartItem: function (cartItem) {
      if (!cartItem) {
        return
      }
      const specStr = parseSpecValue(cartItem.sku.specs)
      const discount = cartItem.sku.discount_price ? true : false
      const soldOut = Cart.isSoldOut(cartItem)
      const online = Cart.isOnline(cartItem)

      this.setData({
        specStr,
        discount,
        soldOut,
        online,
        stock: cartItem.sku.stock,
        skuCount: cartItem.count,
      })
    },
  },

  methods: {
    onDelete(e) {
      const { skuId } = this.properties.cartItem
      cart.removeItem(skuId)
      this.setData({
        cartItem: null,
      })
      this.triggerEvent('itemdelete', { skuId })
    },

    checkedItem(e) {
      const { checked } = e.detail
      this.properties.cartItem.checked = checked
      cart.checkItem(this.properties.cartItem.skuId)
      this.triggerEvent('itemcheck')
    },

    onSelectCount(e) {
      const { count } = e.detail
      cart.alterItem(this.properties.cartItem.skuId,count)
      this.triggerEvent('countfloat')
    },

    
  },
})
