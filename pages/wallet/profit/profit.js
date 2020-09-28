import http from "../../../utils/request"
import { team } from "../../../api/index"
import { isLogin } from "../../../utils/utils"
Page({
    data: {
        ranking:[]
    },
   
    async geRankingData() {
            let { data } = await http.quest(team.bonusList, {openid: wx.getStorageSync('userInfo').openid })
            this.setData({ranking:data})
       
    },

  
   
    onLoad(options) {
      
    },
    onReady() {
    },

   
    onShow() {
        this.geRankingData()
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