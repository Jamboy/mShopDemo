import {Cell} from "./cell";
import {Joiner} from "../../utils/joiner";

/**
 * @name: SkuPending
 * @author: Kivia
 * @date: 2021-03-09 10:37
 * @description：SkuPending 记住选中的cell
 * @update: 2021-03-09 10:37
 */


class SkuPending {
    pending = []
    fences
    size

    constructor(fences) {
        // this.size = size
        this.fences = fences
        this.size = fences.length
    }

    /**
     * 初始化默认sku
     * @param sku
     */
    init(sku) {
        for (let i = 0; i < sku.specs.length; i++) {
            const cell = new Cell(sku.specs[i]);
            this.insertCell(cell, i)
        }
    }

    /**
     * 插入cell
     * @param cell
     * @param x cell所在行号
     */
    insertCell(cell, x) {
        this.pending[x] = cell
    }

    /**
     * 删除cell
     * @param x 行号
     */
    removeCell(x) {
        this.pending[x] = null
    }

    /**
     * 根据行号查找cell
     * @param x
     * @returns {*}
     */
    findSelectedCellByX(x) {
        return this.pending[x]
    }


    /**
     * 判断当前cell所在行是否已有其他已选cell
     * @param cell
     * @param x
     * @returns {boolean}
     */
    isSelected(cell, x) {
        const pendingCell = this.pending[x]
        if (!pendingCell) {
            return
        }
        return pendingCell.id === cell.id
    }

    /**
     * 规格是否已全选
     */
    isIntact() {
        if (this.size !== this.pending.length) {
            return false
        }
        for (let i = 0; i < this.pending.length; i++) {
            if (this._isEmptyPart(i)) {
                return false
            }
        }
        return true
    }

    /**
     * 获取sku code
     * 已选cell  1-12 组成 1-12#1-12
     */
    getSkuCode() {
        const joiner = new Joiner("#")
        this.pending.forEach(cell => {
            joiner.join(cell.getCellCode())
        })
        return joiner.getStr()
    }

    //拼接已选规格
    getAllSelectedSku() {
        const joiner = new Joiner("/")
        for (let i = 0; i < this.pending.length; i++) {
            if (!this._isEmptyPart(i)) {
                joiner.join(this.pending[i].title)
            }
        }
        return joiner.getStr()
    }


    /**
     * 找已选cell 的 fence id
     */
    getAllSelectedCell() {
        const selectedCells = []
        for (let i = 0; i < this.pending.length; i++) {
            if (!this._isEmptyPart(i)) {
                selectedCells.push(this.pending[i].spec.key_id)
            }
        }
        return selectedCells
    }

    /**
     * 获取当前已选规格值 数组
     * @returns {(*|null)[]}
     */
    getCurrentSpecsValues() {
        const values = this.pending.map(cell => {
            return cell ? cell.spec.value : null
        })

        return values
    }

    /**
     * 获取未选的specs index
     * @returns {[]}
     */
    getMissingSpecsKeysIndexs() {
        const indexs = []
        for (let i = 0; i < this.size; i++) {
            if (this._isEmptyPart(i)) {
                indexs.push(i)
            }
        }
        return indexs
    }

    /**
     * 获取待选fences id
     */
    getWaitChooseFences() {
        if (this.isIntact()) {
            return []
        }
        const allFences = []
        this.fences.forEach(f => {
            allFences.push(f.id)
        })
        const selectedFences = this.getAllSelectedCell();
        const waitFences = allFences.filter(w => !selectedFences.includes(w))
        return waitFences
    }

    /**
     * 检测元素是否为空
     * @param index
     * @returns {boolean}
     * @private
     */
    _isEmptyPart(index) {
        return this.pending[index] ? false : true
    }
}


export {
    SkuPending
}