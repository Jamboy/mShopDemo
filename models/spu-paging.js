/**
 * @name: spu-paging
 * @author: Kivia
 * @date: 2021-02-27 15:17
 * @description：spu-paging 获取商品分页数据
 * @update: 2021-02-27 15:17
 */
import {Paging} from "../utils/paging";
import {config} from "../config/config";

class SpuPaging {

    /**
     * 获取spu paging 未加载数据 return paging实例
     */
    static getSpuPaging() {
        return new Paging({
            url: config.GoodsList
        }, 1,10)
    }

}

export {
    SpuPaging
}
