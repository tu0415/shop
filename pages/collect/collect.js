import http from "../../utils/request"
import { goods } from "../../api/index"
import { isLogin, showModal } from "../../utils/utils"
Page({

    /**
     * 页面的初始数据
     */
    data: {
        list:[],
        menuShow: false,
        menuBtnShow:true,
        select:[],
        allSlect: false,
    },


    async getCollectionList() {
        let {data} = await http.quest(goods.collectionList,{openid:wx.getStorageSync('userInfo').openid})
        if (data && data.length) {
            data.forEach(element => {
                element.isCheckShow = true
            });
            this.setData({list:data})
        } else {
            this.setData({list:[]})
        }
    },

    compile() {
        if (this.data.list) {
            this.data.list.forEach(element => {
                element.isShow = true
            });
            this.setData({menuShow:true,menuBtnShow:false,list:this.data.list})
            this.selectAll()
        } 
    },

    selectAll() {
        console.log(this.data.list)
        if(this.data.list && this.data.list.length) {
            console.log('000')
           this.setData({select:this.data.list.filter(item => item.isCheckShow == true)})
        } else {
            console.log(11)
           this.setData({menuShow:false,menuBtnShow:true}) 
        }
    },
    slect(e) {
        console.log(e)
        this.data.list.forEach(item => {
            if (item.goods_id == e.currentTarget.dataset.id) {
                item.isCheckShow = !item.isCheckShow
            }
        });
        this.setData({
            allSlect:this.data.list.some(item => { return item.isCheckShow != true }),
            list:this.data.list
        })
         this.selectAll()
    },
    allSlectEvt() {
        this.setData({allSlect:!this.data.allSlect})
        if (!this.data.allSlect) {
            this.data.list.forEach(item => {
                item.isCheckShow = true
            });
        } else {
            this.data.list.forEach(item => {
                item.isCheckShow = false
            });
        }
        this.setData({list:this.data.list})
         this.selectAll()
    },
    accomplishEvt() {
        this.data.list.forEach(item => {
           item.isShow = false
       });
       this.setData({menuBtnShow:true,menuShow:false,list:this.data.list})
   },

   async detelEvt() {
    let res = await showModal({ content:'确认删除吗' })
    if (res.confirm) {
        let ids = '';
        this.data.list.forEach(item => {
            if (item.isCheckShow) {
                ids += item.goods_id + ",";
            }
        });
        ids = ids.substring(0, ids.length - 1);
        let  data  = await http.quest(goods.delCollection, { goods_id:ids,openid:wx.getStorageSync('userInfo').openid })
        console.log(data) 
        wx.showToast({title: data.msg,icon: 'none',duration: 2000});
        this.getCollectionList()
    }
  
},
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {

    },

  

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {
        this.getCollectionList()
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