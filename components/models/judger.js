/**
 * @name: judger
 * @author: Kivia
 * @date: 2021-03-03 17:59
 * @description：judger 规格状态
 * @update: 2021-03-03 17:59
 */
import {SkuCode} from "./sku-code";
import {CellStatus} from "../../core/enum";
import {SkuPending} from "./SkuPending";
import {Joiner} from "../../utils/joiner";

class Judger {
    fenceGroup
    pathDict = []  //可选cell路径字典
    fences = []
    skuPending

    constructor(fenceGroup) {
        this.fenceGroup = fenceGroup
        this.fences = fenceGroup.fences
        this._initPathDict()
        this._initSkuPending()

    }

    //初始化pending
    _initSkuPending() {
        // const specsLength = this.fenceGroup.fences.length
        this.skuPending = new SkuPending(this.fenceGroup.fences)
        const defaultSku = this.fenceGroup.getDefaultSku() //获取当前默认sku
        if (!defaultSku) {
            return
        }
        this.skuPending.init(defaultSku) //默认sku加入sku pending
        this._initSelectedCell() //
        this.judge(null, null, null, true) //改变其它非默认cell status
    }

    // 初始化默认Cell status
    _initSelectedCell() {
        this.skuPending.pending.forEach(cell => {
            this.fenceGroup.setCellStatusByCellId(cell.id, CellStatus.SELECTED)
        })
    }

    /**
     * 初始化路径字典
     */
    _initPathDict() {
        this.fenceGroup.skuList.forEach(s => {
            const skuCode = new SkuCode(s.code)
            this.pathDict = this.pathDict.concat(skuCode.totalSegments)
        })
        // console.log("-------------->开始加载pathDict begin:----------->")
        // console.log(this.pathDict)
        // console.log("-------------->加载pathDict end  :----------->")
    }

    // sku 是否全选
    isSkuIntact() {
        return this.skuPending.isIntact()
    }


    /**
     * 初始化Cell初始状态
     * 1. 单个fence-cell 组成 path
     * 2. 到字典找，不存在的set forbidden
     * @private
     */
    async _initCellStatus() {
        const singlePath = this._initSinglePath() //获取到可选单选path
        const allSinglePath = await this.findAllKey()
        console.log("-------------->开始加载 allSinglePath begin:----------->")
        console.log(allSinglePath)
        allSinglePath.forEach(e => {
            // console.log("进入循环")
            // if (singlePath.includes(e)) {
            //     console.log("return")
            //     return
            // }
            this._changeCellStatusToForbidden(e)
        })
        // console.log("-------------->开始加载 allSinglePath begin:----------->")
        // return "1"
    }

    async _changeCellStatusToForbidden(e) {
        console.log("-------------->_changeCellStatusToForbidden begin:----------->")
        const keyArr = e.split('-')
        const fenceKey = keyArr[0]
        const cellKey = keyArr[1]
        const cell = await this._findCurrentCell(fenceKey, cellKey)
        console.log(cell)
        if (cell.status === CellStatus.WAiTING) {
            //可选-选中
            console.log('进入waiting')
            cell.status = CellStatus.FORBIDDEN
            console.log(cell.status)
        }
        console.log("-------------->结束加载_changeCellStatusToForbidden end  :----------->")

    }

    /**
     * 找可选单选path
     */
    _initSinglePath() {
        console.log("-------------->_initSinglePath begin:----------->")

        const singlePathDict = this.pathDict.filter(e =>
            !e.includes('#')
        )
        let removeDupPath = []
        singlePathDict.forEach(e => {

            const existed = removeDupPath.find(t => {
                return t === e
            })
            if (existed || e === '1-45') {
                return
            }
            removeDupPath.push(e)
        })

        console.log(singlePathDict)
        console.log('removeDupPath')
        console.log(removeDupPath)
        console.log("-------------->_initSinglePath end  :----------->")
        return removeDupPath

        // if (!temp.find(t => {
        //    return t === e
        // })) {
        //     temp.push(e)
        // }
        //记得return
        // console.log(e)
        // if (temp.find(v =>
        //     记得return v === "4-14"
        // )) {
        //     temp.push(e)
        // }
    }


    /**
     * 所有cell的状态处理
     * @param cell
     * @param x 行
     * @param y 列
     */
    judge(cell, x, y, isInit) {
        if (!isInit) {
            this._changeCurrentCellStatus(cell, x, y) //当前点击cell状态
        }
        // 其它cell处理
        this.fenceGroup.eachCell((cell, x, y) => {
            // 循环每一个cell ，找到它的所有路径
            const path = this._findPotentialPath(cell, x, y)
            if (!path) {
                return
            }
            // 路径存在字典中则改变其状态
            const isIn = this._isInDict(path)
            if (isIn) {
                this.fenceGroup.setCellStatusByXY(x, y, CellStatus.WAiTING)
            } else {
                this.fenceGroup.setCellStatusByXY(x, y, CellStatus.FORBIDDEN)
            }
        })

    }


    /**
     * 获取一个确定的sku
     */
    getDeterminedSku() {
        const code = this.skuPending.getSkuCode()
        const sku = this.fenceGroup.getSku(code)
        return sku
    }

    //获取所有已选sku by self
    getAllSelectedSku() {
        return this.skuPending.getAllSelectedSku()
    }

    // 获取当前已选规格值
    getCurrentSpecsValues() {
        return this.skuPending.getCurrentSpecsValues()
    }


    /**
     * @returns {[]}
     */
    getWaitChooseFences() {
        const waitChooseFencesTitle = this.fences.filter(f => this.skuPending.getWaitChooseFences().includes(f.id))
        const temp = []
        waitChooseFencesTitle.forEach(fence => {
            temp.push(fence.title)
        })
        return temp
    }

    //获取未选规格名
    getMissingSpecsKeys() {
        const index = this.skuPending.getMissingSpecsKeysIndexs()
        const keys = index.map(i => {
            return this.fenceGroup.getSpecTitleByIndex(i)
        })
        return keys
    }

    /**
     * @description 根据key找cell并修改status
     * @param cell
     */
    async judgeBykey(cell, fenceKey) {
        console.log("-------------->judge begin:----------->")
        console.log(cell)
        console.log(fenceKey)
        console.log(cell.id)
        console.log("-------------- judge end  :----------->")

        var currentCell = await this._findCurrentCell(fenceKey, cell.id)
        console.log("-------------->当前点击cell begin:----------->")
        console.log(currentCell)
        console.log("-------------->点击cell   end  :----------->")
        this._changeCurrentCellStatus(currentCell)
        return this.fenceGroup
    }


    /**
     * 寻找Cell潜在路径
     * @param cell
     * @param x
     * @param y
     * @private
     */
    _findPotentialPath(cell, x, y) {
        const joiner = new Joiner("#")
        for (let i = 0; i < this.fences.length; i++) {
            //循环从skupending查找记录过的cell
            const selected = this.skuPending.findSelectedCellByX(i) //找当前循环行的已选cell
            if (x === i) {
                // 当前行 - 存在已选cell
                if (this.skuPending.isSelected(cell, x)) {
                    return
                }
                const cellCode = this._getCellCode(cell.spec)
                joiner.join(cellCode)
            } else {
                // 其他行
                if (selected) {
                    const selectedCellCode = this._getCellCode(selected.spec)
                    joiner.join(selectedCellCode)
                }
            }
        }
        return joiner.getStr()
    }

    /**
     * 路径是否存在
     * @param path
     * @returns {boolean}
     * @private
     */
    _isInDict(path) {
        return this.pathDict.includes(path)
    }

    /**
     * 获取cell code
     * @param spec
     * @returns {string}
     * @private
     */
    _getCellCode(spec) {
        return spec.key_id + '-' + spec.value_id
    }

    /**
     /**
     * @description 改变当前cell的状态，
     * 可以点击-selected waiting 切换
     */
    _changeCurrentCellStatus(cell, x, y) {
        if (cell.status === CellStatus.WAiTING) {
            //可选-选中
            this.fenceGroup.setCellStatusByXY(x, y, CellStatus.SELECTED)
            this.skuPending.insertCell(cell, x)
        }

        if (cell.status === CellStatus.SELECTED) {
            //选中-可选
            this.fenceGroup.setCellStatusByXY(x, y, CellStatus.WAiTING)
            this.skuPending.removeCell(x)
        }
    }


    /**
     * 根据key 找cell
     * @param fenceKey
     * @param cellKey
     * @returns {Promise<*>}
     * @private
     */
    async _findCurrentCell(fenceKey, cellKey) {
        console.log("-------------->_findCurrentCell begin:----------->")
        // console.log("fenceKey" + fenceKey)
        // console.log(cellKey)
        const fence = await this.fences.find(e => {
            return e.id == fenceKey
        })
        if (!fence) {
            console.log("retrun fence")
            return
        }
        const cell = await fence.cells.find(e => {
            return e.id == cellKey
        })
        if (!cell) {
            console.log("retrun cell")

            return
        }
        // console.log("-------------->开始寻找fence begin:----------->")
        // console.log(fence)
        // console.log(cell)
        // console.log("-------------->寻找fence end  :----------->")
        console.log("-------------->_findCurrentCell end  :----------->")

        return cell
    }


    async findAllKey() {
        const allKey = []
        this.fences.forEach(f => {
            const fKey = f.id
            f.cells.forEach(c => {
                const cKey = c.id
                allKey.push(fKey + '-' + cKey)
            })
        })

        console.log("-------------->开始加载 findAllKey   begin:----------->")
        console.log(allKey)
        console.log("-------------->结束加载 findAllKey   end  :----------->")
        return allKey
    }
}

export {
    Judger
}