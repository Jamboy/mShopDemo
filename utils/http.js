/*
 * @Description: 网络请求封装
 * @Author: Jamboy
 * @Date: 2021-02-22 15:51:07
 * @LastEditTime: 2021-06-17 12:02:30
 */
// token -> GDDZ_DRP_TOKEN
// 用户权限：身份信息
// 鼎泽管理员           91
// 鼎泽                9
// 本公司管理员         11
// 本公司人员           1
// 客户                 2
// 成功                      200
// 失败                      400
// 未授权                    401
// token失效                 403
// 未找到                    404
import { codes } from '../config/exception-config.js'
import { HttpException } from '../core/http-exception.js'
import { Token } from '../models/token.js'
import { promisic } from './util.js'

class Http {
  static async request({
    //用对象解构,函数参数
    url,
    data,
    method = 'GET', //默认GET请求
    refetch = true,
    throwError = false,
  }) {
    let res
    try {
      res = await promisic(wx.request)({
        // url: `${config.ApiBaseUrl}${url}`,
        url: `${url}`,
        data,
        method,
        header: {
          'content-type': 'application/json',
          //   GDDZ_DRP_TOKEN: `${wx.getStorageSync('token')}`, //携带后台所需token
        },
      })
    } catch (e) {
      if (throwError) {
        throw new HttpException(-1, codes[-1]) //抛出自定义异常，调用处处理异常
      }
      //  * 捕获无网等异常&处理
      Http.showError(-1)
      return null
    }
    console.log('-------------->开始网络请求结果 begin:----------->')
    const resCode = res.statusCode.toString() //服务器返回的状态code
    console.log('网络请求结果返回resCode:  ' + resCode)
    console.log(res)
    console.log('-------------->结束网络请求结果 end  :----------->')
    if (resCode.startsWith('2')) {
      return res.data //成功 200
    } else {
      console.log('服务器返回错误码,error_code：' + res.data.code)
      if (resCode === '403') {
        // token失效 403  二次重发
        if (!data.refetch) {
          // this._refetch({
          //     url,
          //     data,
          //     method
          // })
        }
      } else {
        if (throwError) {
          throw new HttpException(res.data, code, res.data.msg, res.statusCode)
        }
        // 空数据处理
        if (resCode === '404') {
          //TODO：处理空数据
          // if (res.data.code !== undefined) {
          //     return null
          // }
          return res.data
        }
        // 其它异常处理
        const error_code = res.data.code
        Http.showError(error_code, res.data)
      }
    }
    return res.data
  }

  /**
   * @description: 重新获取token
   * @param {*} data
   * @return {*}
   */
  static async _refetch(data) {
    console.log('-------------->开始二次重发 begin:----------->')
    await Token.getTokenFromServiceByAccount(data.username, data.password) //重新获取token-重新登录
    data.refetch = true //防止二次重发
    console.log(data)
    console.log('-------------->结束二次重发 end  :----------->')
    return await Http.request(data)
  }

  /**
   * @description: 显示错误Toast
   * @param {*} error_code 错误码
   * @param {*} serverError 服务器返回的错误信息
   * @return {*}
   */
  static showError(error_code, serverError) {
    let tip
    // console.log("服务器返回错误信息，serverError: " + serverError.msg)
    if (!error_code) {
      // 服务器未返回错误码，显示服务器错误
      tip = codes[9999]
    } else {
      if (codes[error_code] === undefined) {
        // 本地重定义的错误码不存在，显示服务器返回的错误msg
        tip = serverError.msg
        console.log(serverError)
      } else {
        tip = codes[error_code]
      }
    }
    wx.showToast({
      title: tip,
      icon: 'none',
      duration: 3000,
    })
  }
}

export { Http }
