import http from "../../../utils/request"
import { capital } from "../../../api/index"
Page({

    /**
     * 页面的初始数据
     */
    data: {
        list:[]
    },

    async getDataEvt() {
         let parameter = {
             openid:wx.getStorageSync('userInfo').openid,
          }
        const {data} = await http.quest(capital.cashList,parameter )
        this.setData({list:data})
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {
        this.getDataEvt()
    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {

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

    },

   
})