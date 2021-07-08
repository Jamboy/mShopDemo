/**
 * @name: search.js
 * @author: Kivia
 * @date: 2021-03-16 10:13
 * @description：search.js 搜索请求封装
 * @update: 2021-03-16 10:13
 */
import {config} from "../config/config";
import {Http} from "../utils/http";
import {Paging} from "../utils/paging";

class Search {

    static async getHotList() {
        const res = await Http.request({
            url: config.SearchIndex
        })
        console.log(res.data.hotKeywordList)
        return res.data.hotKeywordList
    }

    //获取分页对象
    static getSearchPaging(keyword){
        return new Paging({
            url: `${config.GoodsList}?keyword=${keyword}`
        },1,5)
    }
}

export {
    Search
}