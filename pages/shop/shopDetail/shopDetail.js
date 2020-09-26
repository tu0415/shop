import http from "../../../utils/request"
import {goods,car} from "../../../api/index"
import {isLogin} from "../../../utils/utils"
Page({

    /**
     * 页面的初始数据
     */
    data: {
       show:false,
       shopInfo:{},
       isModal:false,
       number:1,
    },
    id:'',
    type:'',
    hideModal() {
        this.setData({
            hideFlag:false
        })
    },
    async getData(id) {
        let {data} = await http.quest(goods.goodsDetail,{id,openid:wx.getStorageSync('userInfo').openid})
        this.setData({shopInfo:data})
    },
    
    async collectEvt(e) { // 点击收藏
        let islogin = await isLogin(this.data.isModal)
        this.setData({isModal:islogin})
        if(!this.data.isModal) {
            if(this.data.shopInfo.collection == 0) {
                let {data} = await http.quest(goods.goodsCollection,{goods_id:this.id,openid:wx.getStorageSync('userInfo').openid})
                this.setData({"shopInfo.collection":1})
            } else {
                let {data} = await http.quest(goods.goodsList,{goods_id:this.id,openid:wx.getStorageSync('userInfo').openid})
                this.setData({"shopInfo.collection":0})
            }
        }
       
    },

    close() {
        this.setData({isModal:false})  
       
     },
     accomplish() {
         this.setData({isModal:false}) 
     },

    async openPopup(e) {
        
        let islogin = await isLogin(this.data.isModal)
        this.setData({isModal:islogin})
        this.type = e.currentTarget.dataset.type
        if(!this.data.isModal) {
            this.setData({show:true})
        }
       
     },

     closePopup() {
        this.setData({show:false})
     },
     onChange(e) {
        this.setData({number:e.detail})
     },

     async addCarEvt() {
         if(this.type == 1) {
            let data =  await http.quest(car.addCart,{number:this.data.number,goods_id:this.data.shopInfo.id,openid:wx.getStorageSync('userInfo').openid})
            wx.showToast({title: data.msg, icon: 'success',mask: true,});
            this.closePopup()
         } else {
             wx.navigateTo({
               url: '/pages/orderPay/orderPay?type=2' + '&id=' + this.data.shopInfo.id + '&number=' + this.data.number,
             })
         }
        
    },

    previewImgEvt() {
        let arr = []
            arr = this.data.shopInfo.rotation_img
            wx.previewImage({
                urls: arr,
                current: arr[0]
        });
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {
        this.getData(options.id)
        this.id = options.id
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