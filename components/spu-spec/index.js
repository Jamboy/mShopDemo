// components/spu-spec/index.js
Component({
    /**
     * 组件的属性列表
     */
    properties: {
        list: Object,
        colorList: Array, //颜色
        specList: Array, //规格
        typeList: Array //类型
    },

    observers: {
        'list': function (list) {
            if (!list){
                return
            }
            const color = "规格"
            const spec = "颜色"
            const colorList = list.specificationList.find(t => t.name === color)
            const specList = list.specificationList.find(t => t.name === spec)
            this.setData({
                colorList: colorList.valueList,
                specList: specList.valueList,
                typeList: list.typeList

            })

            console.log("-------------->规格数据预处理 begin:----------->")
            console.log(this.properties.colorList)
            console.log(this.properties.specList)
            console.log(this.properties.typeList)
            console.log("-------------->规格数据预处理 end  :----------->")
        }
    },
    /**
     * 组件的初始数据
     */
    data: {},

    /**
     * 组件的方法列表
     */
    methods: {}
})
