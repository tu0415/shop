import http from "../../../utils/request"
import {site} from "../../../api/index"
import {showModal} from "../../../utils/utils"

Page({

    /**
     * 页面的初始数据
     */
    data: {
        // region: ['广东省', '广州市', '海珠区'],
        addressInfo:{},
        
    },
    id:'',
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {
        this.getAddressDetail(options.id)
        this.id = options.id
    },
 
    switch1Change(e) {
      this.setData({'addressInfo.default':e.detail.value ? '1':'0'})
       
    },

    async getAddressDetail(id) {
        let {data} =  await http.quest(site.addressDetail,{id})
        this.setData({addressInfo:data})
    },

    usernameInput(e) {
        this.setData({'addressInfo.name':e.detail.value})
    },

    phoneInput(e) {
        this.setData({'addressInfo.phone':e.detail.value})
    },

    addressInput(e) {
        this.setData({'addressInfo.address':e.detail.value})
    },

    bindRegionChange(e) {
      
        this.setData({
            'addressInfo.province':e.detail.value[0],
            'addressInfo.city':e.detail.value[1],
            'addressInfo.area':e.detail.value[2],
        })
    },

    async upSiteEvt() {
        let reg = /^1[3|4|5|6|7|8|9][0-9]{9}$/
        if(!this.data.addressInfo.name.trim()) {wx.showToast({title: '请输入姓名',icon: 'none',duration: 2000});return}
        if(!this.data.addressInfo.phone.trim() || !reg.test(this.data.addressInfo.phone) ) {wx.showToast({title: '请输入正确的手机号',icon: 'none',duration: 2000});return}
        if(!this.data.addressInfo.province && !this.data.addressInfo.city && !this.data.addressInfo.area ) {wx.showToast({title: '请输入所在地',icon: 'none',duration: 2000});return}
        if(!this.data.addressInfo.address.trim()) {wx.showToast({title: '请输入详细地址',icon: 'none',duration: 2000});return}
        let paramenter = {
            openid:wx.getStorageSync('userInfo').openid,
            province:this.data.addressInfo.province,
            city:this.data.addressInfo.city,
            area:this.data.addressInfo.area,
            phone:this.data.addressInfo.phone,
            address:this.data.addressInfo.address,
            name:this.data.addressInfo.name,
            default:this.data.addressInfo.default,
            id:this.id
        }
       let data =  await http.quest(site.createAddress,paramenter)
        wx.showToast({title: data.msg})
        setTimeout(()=>{wx.redirectTo({url: '/pages/address/siteList/siteList'})},800)
    },

    async addressEvt() {
        const res = await showModal({ content: '是否确认删除' })
        if (res.confirm) {
            let data =  await http.quest(site.deladdress,{id:this.id})
            wx.showToast({title: data.msg})
            setTimeout(()=>{wx.redirectTo({url: '/pages/address/siteList/siteList'})},800)
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