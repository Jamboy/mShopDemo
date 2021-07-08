/*
 * @Description: 
 * @Author: Jamboy
 * @Date: 2021-02-22 15:41:09
 * @LastEditTime: 2021-02-24 09:42:14
 */
import {
    Http
} from "../utils/http";


/**
 * {
    "msg": "success",
    "code": 200,
    "data": {
        "token": "eyJhbGciOiJIUzUxMiIsInppcCI6IkdaSVAifQ.H4sIAAAAAAAAACXKuw2AIBQF0F1uTcFTRGQIdyBAQcEnAonEuLsk1uc8sDkWk8aZoUHLKja5KzAE51MLbUAfxGB7_QPnNNHfBZokCSkFCcXQq7-SiX4W42JIeD-6XGSrWQAAAA.YgaF87DGvA3Wqr020EwfQBybetgarklbXOT9gkTPtymg7HRlZC-0YH2VkDn8MgKaPD0wf8cwm3dTyeg9N2GzKg"
    }
}
 */
class User extends Http {

    /**
     * @description: 帐号密码登录获取token
     * @param {*} username
     * @param {*} password
     * @return {*}
     */
    static async loginByAccount(username, password) {
        console.log(data);
        return await Http.request({
            url: 'admin/acl/login',
            data: { username, password },
            method: 'POST'
        })
    }


    static async getUserInfo() {
        return await Http.request({
            url: 'admin/acl/info',
        })
    }
    /**
     * @description: 测试本地url数据
     * @param {*}
     * @return {*}
     */
    static async testLocalApi() {
        return await Http.request({
            url: 'goods/count'
        })
    }


}

export {
    User
}