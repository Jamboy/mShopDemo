/*
 * @Description: 获取分类
 * @Author: Jamboy
 * @Date: 2021-02-25 09:43:41
 * @LastEditTime: 2021-07-19 16:12:09
 */

import { config } from '../config/config'
import { Http } from '../utils/http'

class Category {
  /**
   * @description: 获取专题分类
   * @param {*}
   * @return {*}
   */
  static async getHomeLocationC() {
    return await Http.request({
      url: `category/grid/all`,
    })
  }
}

export { Category }
