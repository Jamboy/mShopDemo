Component({

    properties: {
        brand: Array,
        left: Object,
        rightTop: Object,
        rightBottom: Object
    },
    observers: {
        'brand': function (brand) {
            if (!brand){
                return
            }
            if (brand.length === 0){
                return
            }
            const _left = 1
            const _rightTop = 2
            const _rightBottom = 3
            //预处理获取各位置数据
            const left = brand.find(i => i.new_sort_order === _left)
            const rightTop = brand.find(i=> i.new_sort_order === _rightTop)
            const rightBottom = brand.find(i=> i.new_sort_order === _rightBottom)
            this.setData({
                left,
                rightTop,
                rightBottom
            })
            // console.log(left)
            // console.log(rightTop)
            // console.log(rightBottom)
        }
    },
    data: {},
    methods: {}
});
