import http from "../../utils/request"
import {login} from "../../api/index"
import {wslogin} from "../../utils/utils"


Component({
    properties:{
        isModal:{
            type:Boolean,
            value:true
        },
        pid:{
            type:String,
            value:''
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
            try {
              
                let {avatarUrl,province,city,nickName} = e.detail.userInfo
                let code = await wslogin()
                let {data} = await http.quest(login.openid,{code})
                if(this.data.pid) {
                    await http.quest(login.register,{openid:data.openid,avatar:avatarUrl,nickname:nickName,province,city,pid:this.data.pid},'post')
                } else {
                    await http.quest(login.register,{openid:data.openid,avatar:avatarUrl,nickname:nickName,province,city},'post')
                }
                let res = await http.quest(login.getUserInfo,{openid:data.openid},'post')
                wx.setStorageSync('userInfo',res.data)
                this.triggerEvent('accomplish',false)
            } catch (error) {
                wx.showToast({title: '登录失败',});
            }
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

   
})