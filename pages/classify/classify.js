import http from "../../utils/request"
import {goods} from "../../api/index"
Page({

    /**
     * 页面的初始数据
     */
    data: {
        tabIndex:0,
        page:1,
        leftData:[],
        rightData:[],
        scrollTop:0,
        finish:false
    },
    
    async getLeftData() {
        let {data} = await http.quest(goods.typeList)
        this.setData({leftData:data})
        if(this.data.tabIndex == 0) {
            this.getRightData(data[0].id)
        }
    },

    async getRightData(id) {
        let parameter = {
            limit:5,
            page:this.data.page,
            type:id
        }
        if (this.finish) return
        let {data} = await http.quest(goods.goodsList,parameter)
        this.data.finish = data.length < 5
        !this.data.finish && this.setData({page:this.data.page+=1})
        this.setData({rightData:this.data.rightData.concat(data)})
    },

    changTab(e) {
        let {index,id} = e.currentTarget.dataset
        this.setData({tabIndex:index,rightData:[]})
        this.getRightData(id)
    },
    onPullDownRefresh() {
       
    },
    loadMore() {
       this.getRightData(2)
       
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {
    //    this.getLeftData()
    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {

    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function () {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function () {

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function () {

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function () {
        console.log(1111)
    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {

    }
})