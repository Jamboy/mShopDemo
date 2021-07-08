/*
 * @Description: 需重定义显示的服务器返回错误码
 * @Author: Jamboy
 * @Date: 2021-02-23 11:49:06
 * @LastEditTime: 2021-02-23 14:55:12
 */
const codes = {
    "-1": '网络中断,超时或其它异常',
    // 400: '请求失败',
    9999: '抱歉,server error',
    401: '产品未授权',
    403: 'token失效,请重新登录',
    404: '未找到'
}

export {
    codes
}