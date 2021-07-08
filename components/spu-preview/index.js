// components/spu-preview/index.js

/**
 * 单个商品预览组件
 */
Component({
    /**
     * 组件的属性列表
     */
    properties: {
        data: Object,
        w: Number,
        h: Number
    },

    /**
     * 组件的初始数据
     */
    data: {},

    attached() {
    },
    /**
     * 组件的方法列表
     */
    methods: {
        onImgLoad(e) {
            const {width, height} = e.detail
            this.setData({
                w: 340,
                h: 340 * height / width
            })
            // console.log(e.detail.width, e.detail.height)
        },

        /**
         * 跳转商品详情页面
         * @param e
         */
        onDetailTap(e) {
            const pid = e.currentTarget.dataset.pid
            console.log(pid)
            wx.navigateTo({
                url: `/pages/detail/detail?pid=${pid}`
            })
        }
    }
})
