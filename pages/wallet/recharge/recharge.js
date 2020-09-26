import http from "../../../utils/request"
import {order} from "../../../api/index"
import {isLogin,requestPayment} from "../../../utils/utils"
Page({

    /**
     * 页面的初始数据
     */
    data: {
        isModal: false,
        tabIndex:1,
        value:50,
        list:[
            {id:1,number:50,isActive:true},
            {id:2,number:100,isActive:false},
            {id:3,number:200,isActive:false},
        ]
    },

    onchange(e) {
        let {id,number} = e.currentTarget.dataset
        this.setData({tabIndex:id,value:number})
    },
    numberInput(e) {
        this.setData({value:e.detail.value.replace(/\s+/g, '')})
    },
    close() {
        this.setData({ isModal: false })
    },
    accomplish() {
        this.setData({ isModal: false})
    },

    async payEvt() {
        let islogin = await isLogin(this.data.isModal)
        this.setData({ isModal: islogin })
        try {
            if(!this.data.value) {wx.showToast({title: '请输入充值金额',icon:'none'});return}
            let res = await http.quest(order.rechange,{openid:wx.getStorageSync('userInfo').openid,price:this.data.value})
            console.log(res)
            let {data} =  await http.quest(order.wxPay,{id:res.data.order_id,type:2})
            console.log(data)
            await requestPayment(data) 
            await wx.showToast({ title: '充值成功', });
            setTimeout(()=>{ wx.switchTab({ url: '/pages/me/me',})},800)
        } catch (error) {
            await wx.showToast({ title: '充值失败', });
        }
       
       
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {

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

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {

    }
})