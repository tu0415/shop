
import http from "../../utils/request"
import {login} from "../../api/index"
import {isLogin} from "../../utils/utils"

Page({
    /**
     * 页面的初始数据
     */
    data: {
        isModal:false,
        userInfo:{}
    },

    close() {
       this.setData({isModal:false})  
       wx.showTabBar()
    },
    accomplish() {
        this.setData({isModal:false,userInfo:wx.getStorageSync('userInfo')}) 
        wx.showTabBar()
    },

    async loign() {
        let islogin = await isLogin(this.data.isModal)
        this.setData({isModal:islogin})
         if (this.data.isModal) {
            wx.hideTabBar()
        } else {
           
        }
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {
        this.setData({userInfo:wx.getStorageSync('userInfo')}) 
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

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {

    }
})