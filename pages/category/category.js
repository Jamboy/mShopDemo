// pages/category/category.js
import {getSystemAdaptHeightRpx} from "../../utils/system";
import {Catalog} from "../../models/catalog";
import {SpuListType} from "../../core/enum";

Page({

    /**
     * 页面的初始数据
     */
    data: {
        dynamicSegmentH: Number,
        catalogList: Array,
        defaultCatalog: Array,
        catalog: Object
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: async function (options) {
        this.init()
        this.data.catalog = new Catalog()
        const catalogList = await this.data.catalog.getRoot()
        const defaultRootId = this.data.catalog.getDefaultRootId()
        const subList = await this.data.catalog.getSubCatalogList(defaultRootId)
        console.log(catalogList)
        console.log(defaultRootId)
        console.log(subList)
        console.log(subList.banner_url)
        this.setData({
            segmentHeight: this.data.dynamicSegmentH,
            catalogList,
            bannerUrl: subList.banner_url,
            subCatalogList: subList.subCategoryList
        })
    },

    init() {
        this.setDynamicSegmentHeight()
    },

    //
    initCatalogData() {

    },

    //动态设置高度
    async setDynamicSegmentHeight() {
        const subHeight = 60 + 20 + 2
        this.data.dynamicSegmentH = await getSystemAdaptHeightRpx(subHeight)
    },

    onGotoSearch(e) {
        wx.navigateTo({
            url: "/pages/search/search"
        })
    },

    /**
     * 跳转spu-list
     * @param e
     */
    onSubCatalogTap(e) {
        const cid = e.detail.key
        wx.navigateTo({
            url: `/pages/spu-list/spu-list?id=${cid}&type=${SpuListType.SUB_CATALOG}`
        })
    },

    /**
     * 选项卡切换
     * @param e
     */ async onSegChange(e) {
        console.log("选项卡切换")
        console.log(e.detail.activeKey)
        const segId = e.detail.activeKey
        const currentSubList = await this.data.catalog.getSubCatalogList(segId)
        console.log('currentSubList')
        console.log(currentSubList)
        this.setData({
            bannerUrl: currentSubList.banner_url,
            subCatalogList: currentSubList.subCategoryList
        })
    }

})