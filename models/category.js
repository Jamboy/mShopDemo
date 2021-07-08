/*
 * @Description: 获取分类
 * @Author: Jamboy
 * @Date: 2021-02-25 09:43:41
 * @LastEditTime: 2021-02-25 11:38:23
 */

import { config } from "../config/config"
import { Http } from "../utils/http"


 class Category{
    /**
     * @description: 获取专题分类
     * @param {*}
     * @return {*}
     */ 
    static async getGridCategory() {
        const res = await Http.request({
            url: config.CatalogList
        })
        return res.data.categoryList;
    }
 }

 export{
     Category
 }
