/**
 * @name: joiner
 * @author: Kivia
 * @date: 2021-03-09 11:13
 * @description：joiner 拼接字符串
 * @update: 2021-03-09 11:13
 */

class Joiner {
    _str = ''
    _symbol = '-'
    _cutCharNum = 1

    constructor(symbol, cutCharNum) {
        if (symbol) {
            this._symbol = symbol //拼接符
        }
        if (cutCharNum) {
            this._cutCharNum = cutCharNum
        }
    }

    join(part) {
        if (part) {
            this._str += `${part}${this._symbol}`;
        }
    }

    getStr() {
        return this._str.substring(0, this._str.length - this._cutCharNum)
    }
}

export {
    Joiner
}
