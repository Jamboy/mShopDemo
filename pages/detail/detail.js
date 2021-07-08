/**
 * @filepath: pages\detail\detail.js
 * @author: Kivia
 * @date: 2021-03-01 15:40
 * @description：detail.js 展示商品详情
 */
import { SpuDetail } from '../../models/spu-detail'
import { getSystemAdaptHeightRpx } from '../../utils/system'
import { ShoppingWay } from '../../core/enum'
import { CartItem } from '../../models/cart-item'
import { Cart } from '../../models/cart'

// pages/detail/detail.js
Page({
  /**
   * 页面的初始数据
   */
  data: {
    gallery: Array,
    desc: Object,
    spuSpecDataList: Object,
    spu: Object,
    spec: Object,
    scrollViewHeight: Number,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: async function (options) {
    const h = await getSystemAdaptHeightRpx(100)
    const pid = options.pid
    this.initGoodsDetail(pid)
    console.log('-------------->商品详情页面加载 begin:----------->')
    const spu = await this.getMockDetail(1) //无规格
    // const spu = await this.getMockDetail(2)//含规格
    this.setData({
      spu,
      scrollViewHeight: h,
    })
    console.log('-------------->商品详情页面加载 end  :----------->')
  },

  /**
   * 加载商品详情信息
   * @param id
   */
  async initGoodsDetail(id) {
    const res = await SpuDetail.getSpuDetail(id)
    const issue = SpuDetail.getIssue()
    console.log(issue)
    const gallery = res.gallery
    this.setData({
      gallery,
      issue,
      desc: {
        title: res.info.name,
        subtitle: res.info.goods_brief,
        price: res.info.retail_price,
      },
      spuSpecDataList: {
        specificationList: res.specificationList,
        typeList: res.productList,
      },
    })
    console.log('-------------->开始打印商品详情 begin:----------->')
    console.log(this.data.spuSpecDataList)
    console.log(this.data.spuSpecDataList.productList)
    console.log('-------------->结束打印商品详情 end  :----------->')
  },

  /**
   * 获取mock detail
   */
  async getMockDetail(pid) {
    const res = await SpuDetail.getMockSpu(pid)
    console.log('-------------->开始加载Mock begin:----------->')
    console.log(res)
    console.log('-------------->结束加载Mock end  :----------->')
    return res
  },

  /**
   *回到首页
   */
  onGoToHome(e) {
    wx.switchTab({
      url: '/pages/home/home',
    })
  },

  /**
   *回到购物车
   */
  onGoToCart(e) {
    wx.switchTab({
      url: '/pages/cart/cart',
    })
  },

  /**
   *添加到购物车
   */
  onAddToCart(e) {
    this.setData({
      showRealm: true,
      orderWay: 'cart',
    })
  },

  /**
   *直接购买
   */
  onBuy(e) {
    this.setData({
      showRealm: true,
      orderWay: 'buy',
    })
  },

  onSpecChange(e) {
    const spec = e.detail
    this.setData({
      spec,
    })
  },

  onShopping(e) {
    console.log('-------------->开始加载onShopping begin:----------->')
    console.log(e.detail)
    console.log('-------------->结束加载onShopping end  :----------->')
    const data = e.detail
    const chosenSku = data.sku
    console.log('chosenSku: ', chosenSku)
    const skuCount = data.skuCount
    console.log('skuCount: ', skuCount)

    if (data.orderWay === ShoppingWay.CART) {
      console.log('去购物车')
      const cart = new Cart()
      const cartItem = new CartItem(chosenSku, skuCount)
      cart.addItem(cartItem)
      // this.updateCartItem()
    } else {
      console.log('直接购买')
    }
  },
})
