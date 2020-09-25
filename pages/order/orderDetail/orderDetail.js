import http from "../../../utils/request"
import {order} from "../../../api/index"

Page({

    /**
     * 页面的初始数据
     */
    data: {
        info:[]
    },
    async getOrderList(id) {
        let {data} = await http.quest(order.orderDetail,{id})
        this.setData({info:data})

    },
    copy(e) {
        console.log(e)
        let {num} = e.currentTarget.dataset
        wx.setClipboardData({
            data: num,
        })
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {
        this.getOrderList(options.id)
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