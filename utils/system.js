import {promisic, px2rpx} from "./util";

const getSystemSize = async function () {
    const res = await promisic(wx.getSystemInfo)()
    return {
        screenWidth: res.screenWidth,
        screenHeight: res.screenHeight,
        windowWidth: res.windowWidth,
        windowHeight: res.windowHeight
    }
}

/**
 * 获取当前机型下屏幕可用高度 rpx
 * @param subHeight 已用高度
 * @returns {Promise<number>}
 */
const getSystemAdaptHeightRpx = async function (subHeight) {
    const res = await promisic(wx.getSystemInfo)()
    const windowHeight = res.windowHeight  //当前屏幕可用高度 px
    const adaptHeight = px2rpx(windowHeight) - subHeight //转换后的高度减去 需要减去的高度
    return adaptHeight
}

export {
    getSystemSize,
    getSystemAdaptHeightRpx
}