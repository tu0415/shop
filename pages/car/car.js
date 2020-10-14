import http from "../../utils/request"
import { car } from "../../api/index"
import { isLogin, showModal } from "../../utils/utils"
Page({

    /**
     * 页面的初始数据
     */
    data: {
        isModal: false,
        list: [],
        totalPrice: 0,
        select: [],
        totalNumber: 0,
        allSlect: false,
        iscompile: false

    },
    totalPrice: 0,
    totalNumber: 0,
    close() {
        this.setData({ isModal: false })
    },
    accomplish() {
        this.setData({ isModal: false })
    },

    compile() {
        this.setData({ iscompile: !this.data.iscompile })
    },

    async getCarDataEvt() {
        let islogin = await isLogin(this.data.isModal)
        this.setData({ isModal: islogin })
        if(!this.data.isModal) {
        const { data } = await http.quest(car.cartList, { openid: wx.getStorageSync('userInfo').openid })
        this.totalPrice = 0
        this.totalNumber = 0
        if (data && data.length) {
            data.forEach(element => {
                if (element.choice == 1) {
                    this.totalNumber += element.number
                    this.totalPrice += Number(element.markprice) * element.number
                }
            });
            this.setData({
                list: data,
                totalPrice: this.totalPrice.toFixed(2),
                totalNumber: this.totalNumber,
                allSlect:data.some(item => {return item.choice == 2})
            })
        } else {
            this.setData({list: []})
        }
    }
    },

    async updateCartItemEvt(e) {
        let { goodsid, operation } = e.currentTarget.dataset
        if (operation == -1) {
            let { data } = await http.quest(car.reduceCart, { goods_id: goodsid, number: 1, openid: wx.getStorageSync('userInfo').openid })
        } else {
            let { data } = await http.quest(car.addCart, { goods_id: goodsid, number: 1, openid: wx.getStorageSync('userInfo').openid })
        }
        this.getCarDataEvt()
    },

    async slect(e) {
        let { goodsid, id } = e.currentTarget.dataset
        let { data } = await http.quest(car.choiceCart, { id })
        this.getCarDataEvt()
    },

   async allSlectEvt(e) {
        let {choice} = e.currentTarget.dataset
        let { data } = await http.quest(car.choiceAll, { choice, openid: wx.getStorageSync('userInfo').openid })
        this.getCarDataEvt()
    },

   
    async detelEvt() {
        if(this.data.list.every(item => {return item.choice == 2})) {
            wx.showToast({title:'亲,您还没有选择商品哟',icon:'none'})
        } else {
            let ids = '';
            const res = await showModal({ content: '是否确认删除' })
            if (res.confirm) {
                this.data.list.forEach(v => {if (v.choice == 1) {ids += v.id + ","}})
                ids = ids.substring(0, ids.length - 1);
                let { data } = await http.quest(car.clearCart, { ids, openid: wx.getStorageSync('userInfo').openid })
                this.setData({ list: [] })
                this.getCarDataEvt()
            }
        }
    },

    goPay() {
        if(this.data.list.every(item => {return item.choice == 2})) {
            wx.showToast({title:'亲,您还没有选择商品哟',icon:'none'})
        } else {
            wx.navigateTo({url:'/pages/orderPay/orderPay?type=1'})
        }
        
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad() {

    },


    onShow() {
        this.getCarDataEvt()
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