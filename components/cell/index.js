// components/cell/index.js
Component({
    /**
     * 组件的属性列表
     */
    properties: {
        cell: Object,
        x: Number,
        y: Number
    },

    /**
     * 组件的初始数据
     */
    data: {},

    /**
     * 组件的方法列表
     */
    methods: {
        onTap(e) {
            var eventDetail = {
                cell: this.properties.cell,
                x: this.properties.x,
                y: this.properties.y
            }

            var eventOption = {
                bubbles: true, //事件冒泡
                composed: true //事件是否穿越组件
            }
            this.triggerEvent('celltap', eventDetail, eventOption
            )
        }
    }
})
