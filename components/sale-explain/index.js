/**
 * @name: index
 * @author: Kivia
 * @date: 2021-03-12 18:04
 * @description：index
 * @update: 2021-03-12 18:04
 */

Component({
    properties: {
        texts: Array
    },
    observers: {
        "texts": function (texts) {
            this.setData({
                _texts: texts
            })
        }
    },
    data: {},
    methods: {}
});
