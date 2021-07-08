// components/realm/index.js
import {FenceGroup} from "../models/fence-group";
import {Judger} from "../models/judger";
import {SpuDetail} from "../../models/spu-detail";
import {Cell} from "../models/cell";
import {Cart} from "../models/cart";
import {showToast} from "../../utils/ui";

Component({
    /**
     * 组件的属性列表
     */
    properties: {
        spu: Object,
        currentSku: Object,
        orderWay: String
    },

    /**
     * 数据监听器
     */
    observers: {
        'spu': function (spu) {
            if (!spu) {
                return
            }
            if (SpuDetail.isNoSpec(spu)) {
                //处理不含规格的数据
                this.processNoSpec(spu)

            } else {
                //处理含规格的数据
                this.processHasSpec(spu)
            }
            this.triggerSpec()

        }
    },

    /**
     * 组件的初始数据
     */
    data: {
        judger: Object,
        fenceGroup: Object,
        title: String,
        price: Number,
        stock: Number,
        previewImg: String,
        noSpec: Boolean,
        isSkuIntact: Boolean,
        selectedSku: String,
        waitingFence: String,
        currentSkuCount: Cart.SKU_MIN_COUNT,
        outStock: Boolean

    },

    /**
     * 组件的方法列表
     */
    methods: {
        /**
         * 绑定规格数据
         * @param fenceGroup
         */
        bindFenceGroupData(fenceGroup) {
            this.setData({
                fences: fenceGroup.fences,
            })
        },

        /**
         * 绑定spu数据 无sku时
         */
        bindSpuData() {
            const spu = this.properties.spu
            this.setData({
                previewImg: spu.img,
                title: spu.title,
                price: spu.price
            })
        },

        /**
         * 绑定sku 数据
         * @param sku
         */
        bindSkuData(sku) {
            this.setData({
                title: sku.title,
                price: sku.price,
                previewImg: sku.img,
                stock: sku.stock
            })
        },


        bindTipData() {
            this.setData({
                isSkuIntact: this.data.judger.isSkuIntact(),
                selectedSku: this.data.judger.getCurrentSpecsValues(),
                waitingFence: this.data.judger.getMissingSpecsKeys()
            })

        },

        /**
         * 处理无规格
         */
        processNoSpec(spu) {
            this.setData({
                noSpec: true
            })
            this.bindSkuData(spu.sku_list[0])
            this.setStockStatus(spu.sku_list[0].stock, this.data.currentSkuCount)
        },

        /**
         * 处理含有规格
         */
        processHasSpec(spu) {
            const fenceGroup = new FenceGroup(spu) //处理数据
            this.data.fenceGroup = fenceGroup
            fenceGroup.initFences()
            const judger = new Judger(fenceGroup)
            this.data.judger = judger
            this.properties.currentSku = judger.fenceGroup.getDefaultSku()
            if (this.properties.currentSku) {
                this.bindSkuData(this.properties.currentSku)
                this.bindTipData()
            } else {
                this.bindSpuData()
            }
            this.bindFenceGroupData(judger.fenceGroup)
            if (judger.isSkuIntact()) {
                this.setStockStatus(this.properties.currentSku.stock, this.data.currentSkuCount)
            }
        },

        //计数器
        onSelectCounter(e) {
            this.data.currentSkuCount = e.detail.count

            if (!this.data.noSpec && this.data.judger.isSkuIntact()) {
                this.setStockStatus(this.properties.currentSku.stock, this.data.currentSkuCount)
            } else {
                this.setStockStatus(this.properties.spu.sku_list[0].stock, this.data.currentSkuCount)
            }
        },

        /**
         * 是否超出剩余库存
         * @param stock 库存
         * @param currentCount 当前选择的数量
         * @returns {boolean}
         */
        isOutOfStock(stock, currentCount) {
            return stock < currentCount
        },

        /**
         * 更新库存状态
         * @param stock
         * @param currentStock
         */
        setStockStatus(stock, currentStock) {
            this.setData({
                outStock: this.isOutOfStock(stock, currentStock)
            })
        },
        /**
         * 规格点击
         * @param e
         */
        onCellTap: function (e) {
            const detail = e.detail
            const data = e.detail.cell
            const x = detail.x
            const y = detail.y
            const cell = new Cell(data.spec)
            cell.status = data.status
            const judger = this.data.judger
            judger.judge(cell, x, y) // 切换cell状态
            const isSkuIntact = judger.isSkuIntact()
            if (isSkuIntact) {
                this.properties.currentSku = judger.getDeterminedSku()
                this.bindSkuData(this.properties.currentSku)
                this.setStockStatus(this.properties.currentSku.stock, this.data.currentSkuCount)
            }
            this.bindTipData()
            this.bindFenceGroupData(judger.fenceGroup)
            this.triggerSpec()
        },

        onBuy(e) {
            this.triggerSpec()
        },

        triggerSpec() {
            const noSpec = SpuDetail.isNoSpec(this.properties.spu)
            if (noSpec) {
                this.triggerEvent("onSpecChange", {
                    noSpec: noSpec,
                })
            } else {
                this.triggerEvent("onSpecChange", {
                    noSpec: noSpec,
                    isSkuIntact: this.data.isSkuIntact,
                    selectedSku: this.data.selectedSku,
                    waitingFence: this.data.waitingFence

                })
            }
        },

        //抛出选择的商品数据
        onBuyOrToCart(e) {
            const spu = this.properties.spu
            if (SpuDetail.isNoSpec(spu)) {
                //处理不含规格
                this._shoppingNoSpec()
            } else {
                //处理含规格的数据
                this._shoppingContainerSpec()
            }
        },

        //抛出含规格的shopping事件
        _shoppingContainerSpec() {
            if (!this.data.judger.isSkuIntact()) {
                const toast = `请选择：${this.data.waitingFence}`
                showToast(toast)
            }
            this._triggerShoppingEvent(this.properties.currentSku)
        },

        //抛出不含规格的shopping事件
        _shoppingNoSpec() {
            this._triggerShoppingEvent(this._getNoSpecSku())
        },

        //获取无规格的sku
        _getNoSpecSku() {
            return this.properties.spu.sku_list[0]
        },

        /**
         * @description: 抛出购买事件
         * @param {*} sku
         * @return {*}
         */        
        _triggerShoppingEvent(sku) {
            this.triggerEvent('shopping', {
                orderWay: this.properties.orderWay,
                spuId: this.properties.spu.id,
                sku: sku,
                skuCount: this.data.currentSkuCount
            })
        }
    }
})
