/**
 * @Description: 获取首页及各位置的数据
 * @Author: Jamboy
 * @Date: 2021-02-24 16:17:49
 * @LastEditTime: 2021-02-25 15:30:09
 */

import {
    config
} from "../config/config"
import {
    Http
} from "../utils/http"

class Theme {
    homeData = null;

    /** 
     * @description: 获取首页数据集
     * @param {*}
     * @return {*}
     */
    async getHomeData() {
        const res = await Http.request({
            url: config.IndexUrl
        })
        this.homeData = res.data;
        console.log("-------------->开始获取首页数据 theme.getHomeData begin:----------->")
        console.log(this.homeData);
        console.log("-------------->结束获取首页数据 end  :----------->")
    }

    /**
     * @description: 获取Banners
     * @param {*}
     * @return {*}
     */
    getBanners() {
        return this.homeData.banner;
    }

    /**
     * @description: 获取新品信息
     * @return {*}
     */
    getNewGoodList() {
        return this.homeData.newGoodsList;
    }

    /**
     * @returns {*} 获取所有专题
     */
    getTopicList() {
        return this.homeData.topicList;
    }
    /**
     * @description: 获取首页第一屏数据
     * @param {*}
     * @return {*}
     */
    getHomeLocationA() {
        return this.getBanners().find(t => t.id === 1);
    }

    /**
     * @description: 获取首页第二屏数据
     * @param {*}
     * @return {*}
     */
    getHomeLocationB() {
        return this.getBanners();
    }

    /**
     * 获取第四个专题图片
     */
    getHomeLocationD() {
        const topicOne = 0;
        return this.getTopicList().find(t => t.topic_category_id === topicOne);
    }

    /**
     * @returns {*} 品牌List
     */
    getBrandList() {
        return this.homeData.brandList;
    }

    /**
     * 获取第六个专题图片
     */
    getHomeLocationF() {
        const topicTwo = 1
        return this.getTopicList().find(t => t.topic_category_id === topicTwo)
    }
}

export {
    Theme
}