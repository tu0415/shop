import http from "../../../utils/request"
import {order} from "../../../api/index"
import {isLogin} from "../../../utils/utils"
Page({

    /**
     * 页面的初始数据
     */
    data: {
        tabIndex:1,
        page:1,
        limit:5,
        list:[],
        finish:false
    },
    status:0,
    select(e) {
       let {index} = e.currentTarget.dataset
        this.setData({tabIndex:index,list:[],finish:false,page:1})
        this.getOrderList(this.data.page)
    },

    statusEvt() {
        let index = this.data.tabIndex
        if(index == 1) {
            this.status = 0
        } else if(index == 2) {
            this.status = 1
        } else if(index == 3) {
            this.status = 2
        } else if(index == 4) {
            this.status = 3
        } else if(index == 5) {
            this.status = 4
        }
    },

    async getOrderList(page) {
        this.statusEvt()
        let parameter = {
            openid:wx.getStorageSync('userInfo').openid,
            status:this.status,
            limit:this.data.limit,
            page:page
        }
        if (this.data.finish) return
        let {data} = await http.quest(order.orderList,parameter)
        if(data && data.length) {
            this.setData({finish:data.length < 3})
            !this.data.finish && this.setData({page:this.data.page+=1})
            this.setData({list:this.data.list.concat(data)})
        }

    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {
        this.setData({tabIndex:options.type})
        this.getOrderList(this.data.page)
    },

   
    onShow () {
        this.statusEvt()
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
    onReachBottom() {
        this.getOrderList(this.data.page)
    },

   
})