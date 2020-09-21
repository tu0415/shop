import http from "../../utils/request"
import {car} from "../../api/index"
import {isLogin} from "../../utils/utils"
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
        this.setData({isModal: false})
    },
    accomplish() {
        this.setData({isModal: false})
    },

    compile() {
        this.setData({iscompile: !this.data.iscompile})
    },

    async getCarDataEvt() {
        let islogin = await isLogin(this.data.isModal)
        this.setData({isModal: islogin})
        let {data} = await http.quest(car.cartList, {openid: wx.getStorageSync('userInfo').openid})
        this.totalPrice = 0
        data.forEach(element => {
            element.isCheck = true
            this.totalPrice += Number(element.markprice) * element.number
        });
        this.setData({
            list: data,
            totalPrice: this.totalPrice.toFixed(2),
            totalNumber: this.totalNumber
        })
        this.selectAll()
    },

    async updateCartItemEvt(e) {
        let {goodsid,operation } = e.currentTarget.dataset
        if (operation == -1) {
            let {data} = await http.quest(car.reduceCart, {goods_id: goodsid,number: 1,openid: wx.getStorageSync('userInfo').openid})
        } else {
            let {data} = await http.quest(car.addCart, {goods_id: goodsid,number: 1, openid: wx.getStorageSync('userInfo').openid})
        }
        this.getCarDataEvt()
    },

    slect(e) {
        let {goodsid} = e.currentTarget.dataset
        this.data.list.forEach(element => {
            this.totalPrice = 0
            if (element.goods_id == goodsid) {
                element.isCheck = !element.isCheck
                this.totalPrice += Number(element.markprice) * element.number
            }
        });
        this.setData({
            list: this.data.list,
            totalPrice: this.totalPrice.toFixed(2),
            allSlect: this.data.list.some(item => {
                return item.isCheck != true
            })
        })
        this.selectAll()
    },

    allSlectEvt() {
        this.setData({allSlect: !this.data.allSlect})
        this.totalPrice = 0
        if (!this.data.allSlect) {
            console.log(11)
            this.data.list.forEach(item => {
                item.isCheck = true
                this.totalPrice += Number(item.markprice * item.number)
            });
            this.setData({list: this.data.list,totalPrice: this.totalPrice.toFixed(2)
            })
        } else {
            this.data.list.forEach(item => {item.isCheck = falsethis.totalPrice += 0});
            this.setData({list: this.data.list,totalPrice: this.totalPrice})
        }
    },

    selectAll() {
        if (this.data.list) {
            this.totalNumber = 0
            this.totalPrice = 0
            let arr = this.data.list.filter(item => item.isCheck == true)
            console.log(arr)
            if (arr.length) {
                arr.forEach(v => {
                    this.totalNumber += v.number
                    this.totalPrice += v.number * v.markprice
                    this.setData({
                        totalNumber: this.totalNumber,
                        totalPrice: this.totalPrice.toFixed(2),
                    })
                })
            } else {
                this.setData({totalNumber: 0})
            }
        }
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad() {

    },


    onShow() {
        // this.getCarDataEvt()
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