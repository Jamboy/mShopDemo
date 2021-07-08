/**
 * @name: matrix 矩阵处理封装
 * @author: Kivia
 * @date: 2021-03-03 10:19
 * @description：matrix
 * @update: 2021-03-03 10:19
 */

class Matrix {
    m

    constructor(matrix) {
        this.m = matrix
    }

    get rowsNum() {
        return this.m.length
    }

    get colsNum() {
        return this.m[0].length
    }

    /**
     * 循环
     * @param cb 回调函数
     */
    each(cb) {
        for (let j = 0; j < this.colsNum; j++) {
            for (let i = 0; i < this.rowsNum; i++) {
                const element = this.m[i][j]
                cb(element, i, j)
            }
        }
    }

    /**
     * 矩阵转秩
     */
    transpose() {
        const desArr = [[],[],[]]
        for (let j = 0; j < this.colsNum; j++) {
            desArr [j] = []
            for (let i = 0; i < this.rowsNum; i++) {
                desArr[j] [i] = this.m[i][j]
            }
        }
        return desArr
    }
}

export {
    Matrix
}