import http from "../../../utils/request"
import {site} from "../../../api/index"
Page({

    /**
     * 页面的初始数据
     */
    data: {
        region: ['广东省', '深圳市', '南山区'],
        name:'',
        phone:'',
        address:'',
        default:0
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {

    },
    bindRegionChange: function (e) {
        this.setData({
            region:e.detail.value
        })
    },

    switch1Change(e) {
       if(e.detail.value) {
            this.setData({default:1})
       } else {
        this.setData({default:0})
       }
    },


    usernameInput(e) {
        this.setData({name:e.detail.value})
    },

    phoneInput(e) {
        this.setData({phone:e.detail.value})
    },

    addressInput(e) {
        this.setData({address:e.detail.value})
    },

    async addSiteEvt() {
        let reg = /^1[3|4|5|6|7|8|9][0-9]{9}$/
        if(!this.data.name.trim()) {wx.showToast({title: '请输入姓名',icon: 'none',duration: 2000});return}
        if(!this.data.phone.trim() || !reg.test(this.data.phone) ) {wx.showToast({title: '请输入正确的手机号',icon: 'none',duration: 2000});return}
        if(!this.data.region.join('')) {wx.showToast({title: '请输入所在地',icon: 'none',duration: 2000});return}
        if(!this.data.address.trim()) {wx.showToast({title: '请输入详细地址',icon: 'none',duration: 2000});return}
        let paramenter = {
            openid:wx.getStorageSync('userInfo').openid,
            province:this.data.region[0],
            city:this.data.region[1],
            area:this.data.region[2],
            phone:this.data.phone,
            address:this.data.address,
            name:this.data.name,
            default:this.data.default
        }
       let data =  await http.quest(site.createAddress,paramenter)
        wx.showToast({title: data.msg})
        setTimeout(()=>{wx.redirectTo({url: '/pages/address/siteList/siteList'})},800)
    },

    getAddress() {
        let that = this
        wx.chooseAddress({
            success (res) {
              console.log(res)
              that.setData({
                'region[0]':res.provinceName,
                'region[1]':res.cityName,
                'region[2]':res.countyName,
                 name:res.userName,
                 phone:res.telNumber,
                 address:res.detailInfo,

              })
            }
          })
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