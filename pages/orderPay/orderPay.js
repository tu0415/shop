import http from "../../utils/request"
import { car,site,order,goods } from "../../api/index";
import {requestPayment} from "../../utils/utils"
Page({

    /**
     * 页面的初始数据
     */
    data: {
        type:1, // 1 购物车 2 直接购买
        list:[],
        address:{},
        show:false,
        selectPay:[
            {
                id:1,
                way:"微信支付",
                img:'/static/images/xz@2x.png',
                active_img:'/static/images/wxz@2x.png',
                isActive:1,
            },
            {
                id:2,
                way:"余额支付",
                img:'/static/images/xz@2x.png',
                active_img:'/static/images/wxz@2x.png',
                isActive:0,
            }
        ],
        totalPrice:0,
        totalNumber:0,
    },
    totalPrice: 0,
    totalNumber: 0,
    addressData:'',
    number:'',// 直接购买数量
    goodsId:'',// 直接购买商品id
    type:'',// 1 购物车 2 直接购买
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {
        this.type = options.type
        this.setData({type:options.type})
        this.goodsId = options.id
        this.number = options.number
        if(options.number) {
            wx.setStorageSync('number',options.number)
            wx.setStorageSync('goodsId',options.id)
        }
        if(options.data){
            this.addressData = JSON.parse(options.data)
            this.type = this.addressData.type
            this.setData({type:this.addressData.type})
        }
    },

    async getGoodsData(){
        if(this.data.type == 1) {
        let { data } = await http.quest(car.cartList, { openid:wx.getStorageSync('userInfo').openid,choice:1 })
        this.totalPrice = 0 
        this.totalNumber = 0
        data.forEach(element => {
            this.totalNumber += element.number
            this.totalPrice += Number(element.markprice) * element.number
        });
      
        this.setData({
            list: data,
            totalPrice: this.totalPrice.toFixed(2),
            totalNumber: this.totalNumber,
        })
    } else {
        let {data} = await http.quest(goods.goodsDetail,{id:this.goodsId || wx.getStorageSync('goodsId') ,openid:wx.getStorageSync('userInfo').openid})
        let goodsDetail = data
        let number = {
            number: this.number || wx.getStorageSync('number')
        } 
        Object.assign(goodsDetail,number)
        let goodsArr = []
        goodsArr.push(goodsDetail)
        this.setData({
            list: goodsArr,
            totalPrice: (goodsDetail.markprice * goodsDetail.number).toFixed(2),
            totalNumber: goodsDetail.number,
        })
    }
    },

    async getAddressList() {
        let {data} =  await http.quest(site.addressList,{ openid:wx.getStorageSync('userInfo').openid})
        if(data && data.length) {
            if(this.addressData) {
                this.setData({address:this.addressData})
            } else {
                let defaultAddress = data.filter(v => v.default == 1)
                if(defaultAddress && defaultAddress.length) {
                    this.setData({address:defaultAddress[0]})
                } else {
                    this.setData({address:data[0]})
                }
            }
           
            this.getGoodsData()
            
           
        } else {
            wx.showToast({title: '还没有收货地址哟',icon:'none'})
            setTimeout(() => { wx.navigateTo({ url: '/pages/address/addSite/addSite' }) }, 1000);
        }
       
    },
    selectEvt(e) {
        let {id} = e.currentTarget.dataset
        this.data.selectPay.forEach(v=>{
            if(v.id == id) {
                v.isActive = !v.isActive
            } else {
                v.isActive = !v.isActive
            }
        })
        this.setData({selectPay:this.data.selectPay})
    },

    closePopup() {
        this.setData({show:false})
     },
    
     openPopup() {
        this.setData({show:true})
    },

    async payEvt() {
        try {
            let goods= '';
            this.data.list.map(i => {
                goods += `${i.goods_id}-${i.number}` + ','
            })
            goods = goods.substring(0, goods.length - 1);
            let parameter = {
                openid:wx.getStorageSync('userInfo').openid,
                price:this.data.totalPrice,
                address_id:this.data.address.id,
                distribution:10,
                goods:goods
            }
            let res =  await http.quest(order.createOrder,parameter)
            let {data} =  await http.quest(order.wxPay,{id:res.data[0],type:1})
            if(this.data.selectPay[0].isActive) {
                await requestPayment(data) 
                await wx.showToast({ title: '支付成功', });
                setTimeout(() => { wx.redirectTo({ url: '/pages/order/orderList/orderList?type=1' }) }, 800);
            } else {
                let result =  await http.quest(order.balance,{id:res.data[0]})
                if(result.status ==1) {
                    await wx.showToast({ title: '支付成功', });
                    setTimeout(() => { wx.redirectTo({ url: '/pages/order/orderList/orderList?type=1' }) }, 800);
                } else {
                    await wx.showToast({ title: result.msg, });
                }
            }
            
           
            

        } catch (error) {
            await wx.showToast({ title: '支付失败', });
        }
       

       
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
        this.getAddressList()
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