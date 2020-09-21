import http from "../../utils/request"
import {login} from "../../api/index"
import {wslogin} from "../../utils/utils"

Component({
    properties:{
        isModal:{
            type:Boolean,
            value:true
        }
    },
    /**
     * 页面的初始数据
     */
    data: {

    },

    methods:{
        close() {
            this.triggerEvent('close', false)
        },
       async hanleGetUserInfo(e) {
        // this.triggerEvent('accomplish', false)
        console.log(111)
        console.log(this.properties.isModal)
        this.isModal = false

        return
            let {avatarUrl,province,city,nickName} = e.detail.userInfo
            let code = await wslogin()
            let {data} = await http.quest(login.openid,{code})
            await http.quest(login.register,{openid:data.openid,avatar:avatarUrl,nickname:nickName,province,city},'post')
            let res = await http.quest(login.getUserInfo,{openid:data.openid},'post')
            wx.setStorageSync('userInfo',res.data)
           
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
        console.log(1111)
    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {

    }
})