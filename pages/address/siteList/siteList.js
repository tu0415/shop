import http from "../../../utils/request"
import {site} from "../../../api/index"
Page({

    /**
     * 页面的初始数据
     */
    data: {
        addressList: [],
    },
    compay:'',
    async getAddressList() {
        const {data} =  await http.quest(site.addressList,{ openid:wx.getStorageSync('userInfo').openid})
        this.setData({addressList:data})
    },

    goPay(e) {
        let type = {type:this.compay}
        let addressData = JSON.stringify(Object.assign(e.currentTarget.dataset,type))
        if(this.compay) {
            wx.redirectTo({
              url: '/pages/orderPay/orderPay?data=' + addressData,
            })
        }
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {
        this.compay = options.type
        this.getAddressList()

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