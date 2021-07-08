// pages/search/search.js

import {Keywords} from "../../models/keywords";
import {Search} from "../../models/search";
import {showToast} from "../../utils/ui";

const history = new Keywords()
Page({

    /**
     * 页面的初始数据
     */
    data: {
        historyTags: Array,
        hotTags: Array,
        searchStatue: false,
        searchRes: Object,
        searchPaging: Object,
        loadingType: 'end'
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: async function (options) {
        const historyTags = history.get()
        const hotTags = await Search.getHotList()
        this.setData({
            historyTags,
            hotTags,
            searchStatue: false,
        })

    },

    //清空热门搜索数据
    onClearHotList(e) {
        console.log("--------------清空热门搜索数据 begin:----------->")
        history.clear()
        this.setData({
            historyTags: history.get()
        })
        console.log("--------------清空热门搜索数据 end:----------->")
    },

    // 搜索
    async onSearch(e) {
        this.setData({
            searchStatue: true
        })
        console.log("搜索完成")
        const keyWord = e.detail.value || e.detail.name
        console.log(keyWord)
        if (!keyWord) {
            showToast("请输入关键字")
            return
        }
        // history.saveKey(keyWord)
        wx.lin.showLoading({
            color: '#157658',
            type: 'flash',
            fullScreen: true
        })
        history.saveKey(keyWord)
        const searchPaging = Search.getSearchPaging(keyWord)
        this.data.searchPaging = searchPaging
        const res = await searchPaging.getMoreData()
        console.log(res)
        this.setData({
            historyTags: history.get(),
            searchRes: res
        })
        wx.lin.hideLoading()
    },

    //取消
    onCancel(e) {
        this.setData({
            searchStatue: false,
            searchRes: []
        })
    },

    //触底加载更多搜索数据
    async onReachBottom() {
        console.log("触底调用")
        if (!this.data.searchRes.hasMoreData) {
            return
        }
        const res = await this.data.searchPaging.getMoreData()
        console.log(res)
        this.setData({
            searchRes: res
        })
    }
})