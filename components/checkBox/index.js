/*
 * @Description: 
 * @Author: Jamboy
 * @Date: 2021-07-08 16:17:03
 * @LastEditTime: 2021-07-12 13:41:28
 */
// components/checkBox/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    checked: Boolean,
  },

  /**
   * 组件的初始数据
   */
  data: {},

  /**
   * 组件的方法列表
   */
  methods: {
    onChecked(e) {
      let checked = this.properties.checked

      this.setData({
        checked: !this.properties.checked,
      })

      this.triggerEvent(
        'check',
        { checked: checked ? false : true },
        { bubbles: true, complete: true }
      )
    },
  },
})
