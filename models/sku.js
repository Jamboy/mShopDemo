/*
 * @Description:
 * @Author: Jamboy
 * @Date: 2021-07-12 16:33:55
 * @LastEditTime: 2021-07-12 16:35:18
 */

import { Http } from '../utils/http'
class Sku {
  static async getSkuByIds(ids) {
    const res = await Http.request({
      url: `sku?ids=${ids}`,
    })
    return res
  }
}

export { Sku }
