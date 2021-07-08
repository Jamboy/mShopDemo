/**
 * @name: keywords.js
 * @author: Kivia
 * @date: 2021-03-15 18:02
 * @description：keywords.js 缓存热门搜索数据
 * @update: 2021-03-15 18:02
 */

class Keywords {
    static MAX_COUNT = 20
    static KEY = 'keywords'
    keyWords = []

    constructor() {
        if (typeof Keywords.instance === 'object'){
            return Keywords.instance
        }
        Keywords.instance = this
        this.keyWords = this._getLocalKeyWords()
        return this
    }

    saveKey(keyWord) {
        //重复值
        if (this.keyWords.includes(keyWord)) {
            return
        }

        //超过最大值
        if (this.keyWords.length >= Keywords.MAX_COUNT) {
            this.keyWords.pop() //队列 删除最后一个
        }

        this.keyWords.unshift(keyWord) //插入到第一位置
        this._refreshLocal()
    }

    get() {
        if (!this.keyWords) {
            wx.setStorageSync(Keywords.KEY, [])
            return []
        }
        return this.keyWords
    }

    clear() {
        this.keyWords = []
        this._refreshLocal()
    }

    _refreshLocal() {
        wx.setStorageSync(Keywords.KEY, this.keyWords)
    }

    _getLocalKeyWords() {
        const keyWords = wx.getStorageSync(Keywords.KEY)
        return keyWords
    }
}

export {
    Keywords
}