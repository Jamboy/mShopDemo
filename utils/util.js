/*
 * @Description: 常用工具封装
 * @Author: Jamboy
 * @Date: 2021-02-01 11:58:53
 * @LastEditTime: 2021-02-22 17:00:08
 */
const formatTime = date => {
    const year = date.getFullYear()
    const month = date.getMonth() + 1
    const day = date.getDate()
    const hour = date.getHours()
    const minute = date.getMinutes()
    const second = date.getSeconds()

    return `${[year, month, day].map(formatNumber).join('/')} ${[hour, minute, second].map(formatNumber).join(':')}`
}

const formatNumber = n => {
    n = n.toString()
    return n[1] ? n : `0${n}`
}

/**
 * @description: 将方法包装返回promise，wx内置api
 * @param {*} func wx.request，仅传调用方法名
 * @return {*}
 */
const promisic = function (func) {
    return function (params = {}) {
        return new Promise((resolve, reject) => {
            const args = Object.assign(params, {
                success: (res) => {
                    resolve(res);
                },
                fail: (error) => {
                    reject(error);
                }
            });
            func(args);
        });
    };
};

/**
 * 按当前机型转换rpx
 * @param height
 * @returns {number}
 */
const px2rpx = function (height) {
    const {screenWidth: t} = wx.getSystemInfoSync();
    return 750 / t * height
};

/**
 * 排列组合算法
 * @param arr 数组
 * @param size 提取几个
 * @returns {[]}
 */
const combination = function (arr, size) {
    var r = [];

    function _(t, a, n) {
        if (n === 0) {
            r[r.length] = t;
            return;
        }
        for (var i = 0, l = a.length - n; i <= l; i++) {
            var b = t.slice();
            b.push(a[i]);
            _(b, a.slice(i + 1), n - 1);
        }
    }

    _([], arr, size);
    return r;
}


export {
    promisic,
    combination,
    px2rpx
}
