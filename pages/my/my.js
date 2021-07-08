/*
 * @Description: 
 * @Author: Jamboy
 * @Date: 2021-02-24 09:17:30
 * @LastEditTime: 2021-02-24 10:47:39
 */

import { User } from "../../models/user"

// pages/my/my.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        realName: ''
    },

    /**
     * 生命周期函数--监听页面加载
     */
    async onLoad (options) {
        const userInfo = await User.getUserInfo();
        console.log("用户信息:")
        console.log(userInfo)
        this.setData({
            realName: userInfo.data.realName
        })
    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {

    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function () {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function () {

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function () {

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function () {

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {

    }
})