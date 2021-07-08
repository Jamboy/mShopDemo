/**
 * @name: ui.js
 * @author: Kivia
 * @date: 2021-03-16 11:14
 * @description：ui.js
 * @update: 2021-03-16 11:14
 */

const showToast = function (title) {
    wx.showToast({
        title,
        icon: "none",
        duration: 2000
    })
}

//带icon的showToast
const showToastWithIcon = function (title) {
    wx.showToast({
        title,
        duration: 2000
    })
}

export {
    showToast,
    showToastWithIcon
}