
import http from "../../utils/request"
import { login } from "../../api/index"
import { isLogin } from "../../utils/utils"

Page({
    /**
     * 页面的初始数据
     */
    data: {
        isModal: false,
        userInfo: {},
        pid: ''
    },

    close() {
        this.setData({ isModal: false })
        wx.showTabBar()
    },
    accomplish() {
        this.setData({ isModal: false, userInfo: wx.getStorageSync('userInfo') })
        wx.showTabBar()
    },

    async loign() {
        let islogin = await isLogin(this.data.isModal)
        this.setData({ isModal: islogin })
        if (this.data.isModal) {
            wx.hideTabBar()
        } 
    },

    async goDetail(e) {
        let islogin = await isLogin(this.data.isModal)
        this.setData({ isModal: islogin })
        if (this.data.isModal) {
            wx.hideTabBar()
        } else {
            let {type} = e.currentTarget.dataset
            wx.navigateTo({url:'/pages/order/orderList/orderList?type=' + type})
        }
        
    },

    async getUserInfoEvt() {
        let res = await http.quest(login.getUserInfo,{openid:wx.getStorageSync('userInfo').openid},'post')
        wx.setStorageSync('userInfo',res.data)
        this.setData({userInfo:res.data})
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {
        this.setData({ pid: options.pid || '' })
    },
    onShow() {
        if(wx.getStorageSync('userInfo').openid) {
            this.getUserInfoEvt()
        }
    },
    onShareAppMessage(res) {
        let pid = wx.getStorageSync('userInfo').id || ''
        return {
            title: '海浪优选',
            path: '/pages/me/me?pid=' + pid,
            // imgUrl: '/static/images/qbdd@2x.png',
            success(res) {
            }
        }
    }


})