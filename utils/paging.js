/**
 * @name: paging
 * @author: Kivia
 * @date: 2021-02-26 18:04
 * @description：分页请求封装
 * @update: 2021-02-26 18:14
 */
import {Http} from "./http";

class Paging {
    req
    page
    size
    locker = false //数据请求锁
    url
    hasMoreData = true
    accumulator = []

    constructor(req, page = 1, size = 10) {
        this.req = req
        this.page = page
        this.size = size
        this.url = this.req.url
    }

    /**
     * 获取更多数据
     * @param req 请求数据对象
     * @param page 当前页
     * @param count 数据大小
     */
    async getMoreData(req, page = 1, size = 10) {
        //没有更多数据return
        if (!this.hasMoreData) {
            return
        }
        //获取请求锁
        if (!this._getLocker()) {
            return
        }
        //当前未请求数据则发送request请求
        const data = await this._actualGetData()
        //释放请求锁
        this._releaseLocker()

        return data
    }

    /**
     * 获取分页数据
     * @private
     */
    async _actualGetData() {
        const req = this._getCurrentReq() //获取拼接url后的req
        let res = await Http.request(req) //获取返回的分页数据
        let paging = res.data
        console.log(paging)
        //没有返回response
        if (!paging) {
            return null
        }
        //返回response但没有数据
        // TODO：返回对象封装
        if (paging.count === 0) {
            return {
                empty: true, //返回数据是否为空
                items: [], //实际返回数据
                hasMoreData: false, //是否有更多数据
                accumulator: [] //累计请求返回数据
            }
        }
        // 判断是否还有更多数据
        this.hasMoreData = this._hasMoreData(paging.totalPages, paging.currentPage)
        if (this.hasMoreData) {
            //page自增
            this.page += 1
        }
        // 保存所有已返回的数据
        this._accumulator(paging.data)
        return {
            empty: false,
            items: paging.data,
            hasMoreData: this.hasMoreData,
            accumulator: this.accumulator
        }
    }

    /**
     * 是否有更多数据
     * @param totalPages 服务器数据总页码数
     * @param currentPage 当前请求页码
     * @private
     */
    _hasMoreData(totalPages, currentPage) {
        return currentPage < totalPages
    }

    /**
     * 累计请求返回数据
     * @param data
     * @private
     */
    _accumulator(items) {
        this.accumulator = this.accumulator.concat(items)
    }

    /**
     * 获取当前请求数据——>拼接url
     * @private
     */
    _getCurrentReq() {
        let url = this.url //调用方传递的原始url
        const params = `page=${this.page}&size=${this.size}`
        if (!url.includes('?')) {
            url += '?' + params //原始url中不存在?则拼接&
        } else {
            url += '&' + params //存在则拼接?
        }
        this.req.url = url
        console.log("getCurrentPage,当前请求页面url拼接：" + this.req.url)
        return this.req
    }

    /**
     * 获取当前数据锁
     * @returns {boolean|*} 数据请求锁结果
     * @private
     */
    _getLocker() {
        if (this.locker) {
            return false //已在请求数据 return false
        }
        this.locker = true; // 没有请求数据 set locker is true and return true.
        return true;
    }

    /**
     * 释放数据锁
     * @private
     */
    _releaseLocker() {
        this.locker = false
    }
}

export {
    Paging
}