/**
 * @name: cell
 * @author: Kivia
 * @date: 2021-03-03 13:58
 * @description：cell 矩阵值
 * @update: 2021-03-03 13:58
 */
import {CellStatus} from "../../core/enum";

class Cell {
    title
    id
    status = CellStatus.WAiTING
    spec
    skuImg

    constructor(spec) {
        this.title = spec.value
        this.id = spec.value_id
        this.spec = spec
    }

    // 获取cell 的路径id 1-23
    getCellCode() {
        return this.spec.key_id + '-' + this.spec.value_id
    }
}

export {
    Cell
}