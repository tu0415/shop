import http from "../../utils/request"
import { team } from "../../api/index"
Page({

    /**
     * 页面的初始数据
     */
    data: {
        show:false,
        list:[],
        userInfo:''
    },


    async getCreditLogEvt() {
        let {data} = await http.quest(team.creditLog,{openid:wx.getStorageSync('userInfo').openid})
        this.setData({list:data})
    },
    openProp() {
        this.setData({show:true})
    },
    onClose() {
        this.setData({show:false})
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        this.getCreditLogEvt()
    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow() {
        this.setData({userInfo:wx.getStorageSync('userInfo') || ''})
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