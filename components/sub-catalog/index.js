// components/sub-catalog/index.js
Component({
    /**
     * 组件的属性列表
     */
    properties: {
        bannerUrl: String,
        subCatalogList: Array
    },

    /**
     * 组件的初始数据
     */
    data: {},

    /**
     * 组件的方法列表
     */
    methods: {
        //点击item 抛出分类id
        onItemTap(e) {
            this.triggerEvent("itemTap", e.detail)
        }
    }
})
