import http from "../../utils/request"
import { team } from "../../api/index"
import { isLogin } from "../../utils/utils"
Page({
    data: {
        isModal: false,
        teamInfo:{},
        commission:{},
        pool:{},
        ranking:[],
        pid:''
    },

    async getTeamData() {
        let islogin = await isLogin(this.data.isModal)
        this.setData({ isModal: islogin })
        if (this.data.isModal) {
           
        } else {
            let { data } = await http.quest(team.teamInfo, {openid: wx.getStorageSync('userInfo').openid })
            this.setData({teamInfo:data})
        }
    },

    async getCommissionProfitData() {
        let islogin = await isLogin(this.data.isModal)
        this.setData({ isModal: islogin })
        if (this.data.isModal) {
           
        } else {
            let { data } = await http.quest(team.commissionProfit, {openid: wx.getStorageSync('userInfo').openid })
            this.setData({commission:data})
        }
    },

    async getPoolData() {
        let islogin = await isLogin(this.data.isModal)
        this.setData({ isModal: islogin })
        if (this.data.isModal) {
           
        } else {
            let { data } = await http.quest(team.pool, {openid: wx.getStorageSync('userInfo').openid })
            this.setData({pool:data})
        }
    },
    async geRankingData() {
        let islogin = await isLogin(this.data.isModal)
        this.setData({ isModal: islogin })
        if (this.data.isModal) {
           
        } else {
            let { data } = await http.quest(team.ranking, {openid: wx.getStorageSync('userInfo').openid })
            this.setData({ranking:data})
        }
    },

    close() {
        this.setData({ isModal: false })
    },
    accomplish() {
        this.setData({ isModal: false })
        this.getTeamData()
        this.getCommissionProfitData()
        this.getPoolData()
        this.geRankingData()
    },
   
    onLoad(options) {
        this.setData({ pid: options.pid || '' })
        if(options.pid) {
            this.setData({isModal:true})
        }
    },
    onReady() {
        this.getTeamData()
    },

   
    onShow() {
        this.getCommissionProfitData()
        this.getPoolData()
        this.geRankingData()
    },

    onShareAppMessage(res) {
        let pid = wx.getStorageSync('userInfo').id || ''
        return {
            title: '乐速易购',
            path: '/pages/team/team?pid=' + pid,
            // imgUrl: '/static/images/qbdd@2x.png',
            success(res) {
            }
        }
    }

   
})