/*
 * @Description: 
 * @Author: Jamboy
 * @Date: 2021-02-02 15:26:05
 * @LastEditTime: 2021-02-24 14:53:49
 */

Page({

    /**
     * 页面的初始数据
     */
    data: {
        username: "",
        password: ""
    },

    /**
     * 生命周期函数--监听页面加载
     */
    async onLoad(options) {
        // const data = await User.testLocalApi()
        // console.log(data.data.data.goodsCount)
    },

    /**
     * 输入账号密码登录
     * @param {} e 
     */
    async startLogin(e) {
        wx.reLaunch({
            url: '/pages/home/home',
        })

        // var username = e.detail.value.username;
        // var password = e.detail.value.password;
        // console.log(username, password)
        // // 校验输入完善
        // if (username.length == 0 || password.length == 0) {
        //     wx.showToast({
        //         title: '输入有误，请重新输入',
        //         icon: 'none',
        //         duration: 1000
        //     })
        // } else {
        //     username = cropto.encrypt(username); //获取后加密
        //     password = cropto.encrypt(cropto.md5(password));
        //     // console.log(username, password)
        //     const token = await Token.getTokenFromServiceByAccount(username, password); //获取token
        //     if (token) {
        //         console.log('获取token:' + token)
        //         wx.showToast({
        //             title: '测试登录成功',
        //             icon: 'none'
        //         })
        //         wx.reLaunch({
        //             url: '/pages/my/my',
        //         })
        //     }

        //     // console.log(res.data)
        //     // let url = "http://106.53.83.193:9888/admin/acl/login"
        //     // wx.request({
        //     //     url: url,
        //     //     data: {
        //     //         username,
        //     //         password
        //     //     },
        //     //     header: {
        //     //         'content-type': 'application/json'
        //     //     },
        //     //     method: "POST",
        //     //     success: (result) => {
        //     //         wx.showToast({
        //     //             title: '测试登录成功',
        //     //         })
        //     //         console.log(result)
        //     //     },
        //     //     fail: (res) => {},
        //     //     complete: (res) => {},
        //     // })
        // }
    },

    /**
     * 获取手机号登录
     * @param {*} e 
     */
    getPhoneNumber(e) {
        console.log(e.detail.errMsg)
        console.log(e.detail.iv)
        console.log(e.detail.encryptedData)
    }
})