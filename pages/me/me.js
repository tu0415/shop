
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
        } else { // 1-5订单 6分红 7积分 8余额 9收藏 10收货地址 11用户反馈 
            let {type} = e.currentTarget.dataset
            if(type == 5) {

            } else if(type ==6) {
                wx.navigateTo({url:'/pages/wallet/profit/profit'})
            }else if(type ==7) {
                wx.navigateTo({url:'/pages/integral/integral'})
            }else if(type ==8) {
                wx.navigateTo({url:'/pages/wallet/balance/balance'})
            }else if(type ==9) {
                wx.navigateTo({url:'/pages/collect/collect'})
            }else if(type ==10) {
                wx.navigateTo({url:'/pages/address/siteList/siteList'})
            } else {
                wx.navigateTo({url:'/pages/order/orderList/orderList?type=' + type})
            }
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
        if(options.pid) {
            this.setData({isModal:true})
        }
    },
    onShow() {
        if(wx.getStorageSync('userInfo').openid) {
            this.getUserInfoEvt()
        }
    },
    onShareAppMessage(res) {
        let pid = wx.getStorageSync('userInfo').id || ''
        return {
            title: '乐速易购',
            path: '/pages/me/me?pid=' + pid,
            // imgUrl: '/static/images/qbdd@2x.png',
            success(res) {
            }
        }
    }
})