import http from "../../utils/request"
import { team } from "../../api/index"
import { isLogin } from "../../utils/utils"
Page({
    data: {
        isModal: false,
        teamInfo:{},
        commission:{},
        pool:{},
        ranking:[]
    },

    async getTeamData() {
        let islogin = await isLogin(this.data.isModal)
        this.setData({ isModal: islogin })
        if (this.data.isModal) {
           
        } else {
            let { data } = await http.quest(team.teamInfo, {openid: wx.getStorageSync('userInfo').openid })
            this.setData({teamInfo:data})
        }
    },

    async getCommissionProfitData() {
        let islogin = await isLogin(this.data.isModal)
        this.setData({ isModal: islogin })
        if (this.data.isModal) {
           
        } else {
            let { data } = await http.quest(team.commissionProfit, {openid: wx.getStorageSync('userInfo').openid })
            this.setData({commission:data})
        }
    },

    async getPoolData() {
        let islogin = await isLogin(this.data.isModal)
        this.setData({ isModal: islogin })
        if (this.data.isModal) {
           
        } else {
            let { data } = await http.quest(team.pool, {openid: wx.getStorageSync('userInfo').openid })
            this.setData({pool:data})
        }
    },
    async geRankingData() {
        let islogin = await isLogin(this.data.isModal)
        this.setData({ isModal: islogin })
        if (this.data.isModal) {
           
        } else {
            let { data } = await http.quest(team.ranking, {openid: wx.getStorageSync('userInfo').openid })
            this.setData({ranking:data})
        }
    },

    close() {
        this.setData({ isModal: false })
    },
    accomplish() {
        this.setData({ isModal: false })
        this.getTeamData()
    },
   
    onLoad(options) {
        this.getCommissionProfitData()
        this.getPoolData()
        this.geRankingData()
    },
    onReady() {
        this.getTeamData()
    },

   
    onShow() {
        
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