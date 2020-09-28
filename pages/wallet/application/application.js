import http from "../../../utils/request"
import { capital } from "../../../api/index"
Page({

    /**
     * 页面的初始数据
     */
    data: {
        balance:0,
        money:'',
        service:''
    },

    all() {
        if(this.data.balance) {
            this.setData({money:this.data.balance})
        }
    },
    moneyEvt(e){
        this.setData({money:e.detail.value})
    },
    async withdrawEvt() {
        if(!this.data.money.trim()) { wx.showToast({title: '请输入提现金额',icon:'none'});return} 
         let parameter = {
             openid:wx.getStorageSync('userInfo').openid,
            money:this.data.money
          }
        const data = await http.quest(capital.cash,parameter )
        if(data.status == 1) {
            wx.showToast({title: data.msg,icon:'none'})
            setTimeout(()=>{wx.redirectTo({ url: '/pages/wallet/balance/balance'})},800)
        } else {
            wx.showToast({title: data.msg,icon:'none'})
        }
    },
    async getServiceEvt() {
        const {data} = await http.quest(capital.service)
        this.setData({service:data.service})
    },
    copy() {
        wx.setClipboardData({
          data: this.data.service,
        })
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {
        this.getServiceEvt()
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
        this.setData({balance:wx.getStorageSync('userInfo').balance  || 0,})
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