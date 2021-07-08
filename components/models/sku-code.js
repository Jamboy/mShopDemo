/**
 * @name: sku-code
 * @author: Kivia
 * @date: 2021-03-03 18:02
 * @description：sku-code
 * @update: 2021-03-03 18:02
 */
import {combination} from "../../utils/util";

class SkuCode {
    code
    spuId
    totalSegments = [] //合计组合

    constructor(code) {
        this.code = code
        this._splitToSegments()
    }

    /**
     * 分割code 获取spuId and specCode 组合路径
     * "code": "2$1-45#3-9#4-14",
     * 切分提取 1-45，3-9，4-14——排列组合
     * 结果:"1-45", "3-9", "4-14", "1-45#3-9", "1-45#4-14", "3-9#4-14", "1-45#3-9#4-14"
     * @private
     */

    _splitToSegments() {
        const spuAndSpec = this.code.split('$');
        this.spuId = spuAndSpec[0]
        const specCodeArray = spuAndSpec[1].split('#')
        const length = specCodeArray.length
        for (let i = 1; i <= length; i++) {
            const tempSegment = combination(specCodeArray, i)
            const joinSegments = tempSegment.map(segs => {
                return segs.join('#')
            })
            this.totalSegments = this.totalSegments.concat(joinSegments)
        }
        // console.log("-------------->totalSegments begin:----------->")
        // console.log(this.totalSegments)
        // console.log("-------------->totalSegments end  :----------->")
    }

}

export {
    SkuCode
}