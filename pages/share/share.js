import http from "../../utils/request"
import { team } from "../../api/index"
Page({

    /**
     * 页面的初始数据
     */
    data: {
        posterUrl: '',
        show: false
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {
       
    },
    onShow() {
         this.getShareEvt()
    },

    async getShareEvt() {
        const { data } = await http.quest(team.poster, { openid: wx.getStorageSync('userInfo').openid })
        console.log(data)
        this.setData({ posterUrl: data.path })
    },
    onClose() {
        this.setData({ show: false })
    },

    openSetting() {
        let that = this
        that.setData({ show: true })
        wx.openSetting({
            success(settingdata) {
                if (settingdata.authSetting['scope.writePhotosAlbum']) {
                    console.log('获取权限成功，给出再次点击图片保存到相册的提示。')
                    that.setData({ show: false })
                } else {
                    console.log('获取权限失败，给出不给权限就无法正常使用的提示')
                }
            }
        })
    },
    saveEvt() {
        let that = this;
        let isFirst = wx.getStorageSync('isFirst') || 0
        //获取相册授权
        wx.getSetting({
            success(res) {
                console.log(res.authSetting['scope.writePhotosAlbum'])
                if (!res.authSetting['scope.writePhotosAlbum']) {
                    console.log('2222')
                    wx.authorize({
                        scope: 'scope.writePhotosAlbum',
                        success() {
                            that.saveImgEvt()
                        },
                        fail: err1 => {
                            if (isFirst === 0) {
                                wx.setStorageSync('isFirst', 1)
                            } else {
                                that.setData({ isShow: true })
                                that.openSetting()
                            }

                        }
                    });
                } else {
                    that.saveImgEvt()
                }
            }
        });


    },

    saveImgEvt() {
        let that = this
        wx.downloadFile({
            url: that.data.posterUrl,
            success: res => {
                wx.saveImageToPhotosAlbum({
                    filePath: res.tempFilePath,
                    success: data => {
                        wx.showToast({title: '保存成功',icon: 'success',duration: 2000})
                    },
                    fail:err=>{ wx.showToast({title: '保存失败了',icon: 'none', duration: 2000})
                    }
                })
            },
            fail:err=>{
                wx.showToast({
                    title:'保存失败',
                    icon: 'none',
                    duration: 2000
                })
              
            }

        })
    },







    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {

    }
})