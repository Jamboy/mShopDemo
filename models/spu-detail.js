/*
 * @Description: 
 * @Author: Jamboy
 * @Date: 2021-06-05 11:43:59
 * @LastEditTime: 2021-06-17 15:08:56
 */
/**
 * @name: spu-detail
 * @author: Kivia
 * @date: 2021-03-01 15:09
 * @description：spu-detail by id 获取商品详情信息
 * @update: 2021-03-01 15:09
 */
import {Http} from "../utils/http";
import {config} from "../config/config";

class SpuDetail {
    res

    /**
     * 根据ID获取商品详情信息
     */
    static async getSpuDetail(id) {
        this.res = await Http.request({
            url: `${config.GoodsDetail}?id=${id}`
        })
        return this.res.data
    }

    static getIssue() {
        const issue = this.res.data.issue
        const text = issue.map(i => {
            return {
                question: i.question,
                answer: i.answer
            }
        })
        return text
    }

    /**
     * get lin mock response
     * @param id
     * @returns {Promise<void>}
     */
    // static async getMockSpu(id) {
    //     const res = await Http.request({
    //         url: `${config.MockGoodsDetail}?id=${id}`
    //     })
    //     return res
    // }

    static async getMockSpu(pid) {
        console.log("getMockSpu")
        console.log(pid)
        const url = pid == 1 ? config.MockGoodsDetail : config.MockGoodsNoSkuDetail

        const res = await Http.request({
            url: url
        })
        return res
    }

    /**
     * 判断spu是否含规格
     * @param spu
     */
    static isNoSpec(spu) {
        if (spu.sku_list.length === 1 && spu.sku_list[0].specs.length === 0) {
            return true
        }
        return false
    }
}

export {
    SpuDetail
}