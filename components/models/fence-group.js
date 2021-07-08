/**
 * @name: fence-group
 * @author: Kivia
 * @date: 2021-03-02 11:40
 * @description：fence-group 提取处理一组栅栏值
 * @update: 2021-03-02 11:40
 */
import {Matrix} from "./matrix";
import {Fence} from "./fence";

class FenceGroup {
    spu
    skuList = []
    fences = []

    constructor(spu) {
        this.spu = spu
        this.skuList = spu.sku_list
    }

    /**
     * 循环初始化fences
     */
    initFences1() {
        const matrix = this._createMatrix(this.skuList) //创建矩阵
        const fences = []
        let currentJ = -1
        matrix.each((element, i, j) => {
            if (currentJ !== j) {
                //循环新列，创建新fence
                currentJ = j
                fences[currentJ] = this._createFence()
            }
            //fence 赋值
            fences[currentJ].pushValueTitle(element.value)
        })
        console.log(fences)
    }

    /**
     * 转秩封装
     */
    initFences() {
        const matrix = this._createMatrix(this.skuList) //创建规格数据矩阵
        const fences = []
        const newMatrix = matrix.transpose()  //转秩
        // console.log("-------------->开始处理专职后的矩阵 begin:----------->")
        newMatrix.forEach(r => {
            // const fence = new Fence(r)
            const fence = this._createFence(r)
            fence.init()

            if (this._hasSketchFence() && this._isSketchFence(fence.id)) {
                fence.setSketchImg(this.skuList)
            }
            fences.push(fence)
        })
        this.fences = fences
        console.log("-------------->处理转秩后的矩阵 end  :----------->")
        console.log(fences)
    }


    /**
     * 循环取出cell
     * @param callback 回调函数传回cell
     */
    eachCell(callback) {
        for (let i = 0; i < this.fences.length; i++) {
            for (let j = 0; j < this.fences[i].cells.length; j++) {
                const cell = this.fences[i].cells[j]
                callback(cell, i, j)
            }
        }
    }

    /**
     * 获取默认sku
     * @returns {*}
     */
    getDefaultSku() {
        const defaultSkuId = this.spu.default_sku_id;
        // const defaultSkuId = 3;
        if (!defaultSkuId) {
            return
        }
        return this.skuList.find(s => s.id === defaultSkuId)
    }

    /**
     * 根据skucode获取对应sku
     * @param skuCode
     * @returns {T|null}
     */
    getSku(skuCode) {
        const fullSkuCode = this.spu.id + '$' + skuCode
        const sku = this.skuList.find(s => s.code === fullSkuCode)
        return sku ? sku : null
    }

    /**
     * 根据cell id设置status
     * @param id
     * @param status
     */
    setCellStatusByCellId(id, status) {
        this.eachCell((cell) => {
            if (cell.id === id) {
                cell.status = status
            }
        })
    }

    /**
     * 根据坐标设置cell状态
     * @param x
     * @param y
     * @param status
     */
    setCellStatusByXY(x, y, status) {
        this.fences[x].cells[y].status = status
    }

    /**
     * 根据index获取规格名
     * @param index
     * @returns {*}
     */
    getSpecTitleByIndex(index) {
        return this.fences[index].title
    }

    /**
     * 是否含有可视规格
     * @returns {boolean}
     * @private
     */
    _hasSketchFence() {
        return this.spu.sketch_spec_id ? true : false
    }

    /**
     * 该fence是否为可视fence
     * @param fenceId
     */
    _isSketchFence(fenceId) {
        return this.spu.sketch_spec_id === fenceId ? true : false
    }


    /**
     * 创建fence
     * @param element
     * @private
     */
    _createFence(r) {
        const fence = new Fence(r)
        return fence
    }

    /**
     * 创建矩阵
     * @param skuList
     * @return Matrix
     * @private
     */
    _createMatrix(skuList) {
        const m = []
        skuList.forEach(sku => {
            m.push(sku.specs)
        })
        console.log("-------------->创建矩阵 begin:----------->")
        console.log(m)
        console.log("-------------->创建矩阵 end  :----------->")
        return new Matrix(m)
    }


}

export {
    FenceGroup
}