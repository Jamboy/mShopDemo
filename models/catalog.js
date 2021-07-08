/**
 * @name: catalog.js
 * @author: Kivia
 * @date: 2021-03-15 10:19
 * @description：catalog.js 获取分类目录数据
 * @update: 2021-03-15 10:19
 */
import {Http} from "../utils/http";
import {config} from "../config/config";


class Catalog {
    resTemp;

    /**
     * 获取所有一级分类目录及一级分类目下二级目录
     */
    async getRoot() {
        const res = await Http.request({
            url: config.CatalogList
        })
        this.resTemp = res.data
        const catalogList = this.resTemp.categoryList.map(item => {
            return {
                id: item.id,
                name: item.name,
                front_desc: item.front_desc,
                banner_url: item.banner_url
            }
        })
        return catalogList
    }

    /**
     * 获取默认显示的rootId
     */
    getDefaultRootId() {
        let defaultId = this.resTemp.currentCategory.id
        if (!defaultId) {
            defaultId = this.resTemp.categoryList[0].id
        }
        return defaultId
    }

    /**
     * 获取二级目录
     * @param rootId
     * @returns {*}
     */
    async getSubCatalogList(rootId) {
        const res = await Http.request({
            url: `${config.CatalogCurrent}?id=${rootId}`
        })
        return res.data.currentCategory
    }
}

export {
    Catalog
}