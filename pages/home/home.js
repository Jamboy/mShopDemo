/*
 *pages/home/home.js
 * @Description: 首页
 * @Author: Jamboy
 * @Date: 2021-02-24 14:19:50
 * @LastEditTime: 2021-03-01 11:51
 */
import {Category} from "../../models/category";
import {Theme} from "../../models/theme";
import {SpuPaging} from "../../models/spu-paging";

Page({

    /**
     * 页面的初始数据
     */
    data: {
        themeA: null,
        bannersB: [],
        gridCategory: [],
        newGoodList: [],
        topicD: null,
        brandList: [],
        topicF: [],
        spuPaging: null,
        loadingType: "loading"
    },

    /**
     * 生命周期函数--监听页面加载
     */
    async onLoad(options) {
        this.initAllData()
        this.initBottomSpuList()
    },

    /**
     * 加载首页初始数据
     * @returns {Promise<void>}
     */
    async initAllData() {
        const theme = new Theme();
        await theme.getHomeData();//获取首页数据
        const themeA = theme.getHomeLocationA(); //获取首页第一个topic
        const bannersB = theme.getHomeLocationB();//获取首页第二个banners
        const gridCategory = await Category.getGridCategory(); //获取首页分类
        const newGoodList = theme.getNewGoodList();//获取首页上新
        const topicD = theme.getHomeLocationD();//获取首页第二个topic
        const brandList = theme.getBrandList();//获取首页品牌直供
        const topicF = theme.getHomeLocationF()//获取首页第三个topic
        this.setData({
            themeA,
            bannersB,
            gridCategory,
            newGoodList,
            topicD,
            brandList,
            topicF
        })

    },

    /**
     * 获取底部商品列表
     * @returns {Promise<void>}
     */
    async initBottomSpuList() {
        const spuPaging = SpuPaging.getSpuPaging() //获取spuPaging对象
        this.data.spuPaging = spuPaging //保存spuPaging对象
        const spuList = await spuPaging.getMoreData() //调用paging对象获取数据
        console.log("-------------->开始初始加载spu begin:----------->")
        console.log(spuList)
        console.log("-------------->结束初始加载spu end  :----------->")
        wx.lin.renderWaterFlow(spuList.items, false, () => {
            console.log('瀑布流数据加载成功')
        })
    },

    /**
     * 页面上拉触底事件的处理函数
     */
    async onReachBottom() {
        const spuList = await this.data.spuPaging.getMoreData()
        console.log("-------------->获取更多数据 begin:----------->")
        if (!spuList) {
            console.log("-------------->没有更多数据 end:----------->")
            return
        }
        console.log(spuList)
        console.log("——————————————>获取更多数据 end:------------->")
        wx.lin.renderWaterFlow(spuList.items, false, () => {
            console.log("触底调用加载成功")
        })
        if (!spuList.hasMoreData){
            this.setData({
                loadingType: "end"
            })
        }
    },

})